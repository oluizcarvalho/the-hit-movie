import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { scrollToTop } from '../../shared/helpers/dom.helper';
import { capitalizeText, listGenres } from '../../shared/helpers/options.helper';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, merge, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { MovieGeneric } from '../../shared/models/movie.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatChipSelectionChange } from '@angular/material/chips';

interface SearchForm {
	title: FormControl<string>;
	genre: FormControl<string>;
}

const SCROLL_SIZE = 200;

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
	public typeSearch!: string;
	public isLoading: boolean = false;
	public listGenres = listGenres;
	public results: MovieGeneric[] = [];
	public notResults: boolean = false;
	public isMobile: boolean = false;
	public arrowsDisabled = {
		left: true,
		right: false,
	};
	public searchForm = new FormGroup<SearchForm>({
		title: new FormControl('', { nonNullable: true }),
		genre: new FormControl('', { nonNullable: true }),
	});
	public type = new Map<string, 'tv_movie' | 'tv_series'>([
		['movies', 'tv_movie'],
		['series', 'tv_series'],
	]);
	public genreParams: string = '';
	private _destroyed = new Subject<void>();

	constructor(
		private route: ActivatedRoute,
		private movieService: MovieService,
		private readonly breakpointObserver: BreakpointObserver
	) {
		breakpointObserver
			.observe([Breakpoints.HandsetPortrait])
			.pipe(takeUntil(this._destroyed))
			.subscribe(result => {
				this.isMobile = result.matches;
			});
	}

	ngOnInit(): void {
		this.route.queryParamMap.subscribe((params: ParamMap) => {
			this.genreParams = capitalizeText(params.get('genre')) || '';
		});
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.typeSearch = params.get('type') || '';
			if (!this.genreParams) {
				this.searchForm.reset({ genre: this.genreParams, title: '' }, { emitEvent: false });
				this.results = [];
				if (this.typeSearch === 'series' && !this.genreParams) {
					this.getSeries();
				} else {
					this.getMovies();
				}
			}
			scrollToTop();
		});
		merge(
			this.searchForm.controls.title?.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()),
			this.searchForm.controls.genre?.valueChanges
		).subscribe(() => {
			if (!this.isLoading) {
				this.isLoading = true;
				const type = this.type.get(this.typeSearch);
				const { title, genre } = this.searchForm.getRawValue();
				this.advancedSearch(title, genre, type);
			}
		});
	}

	onSelectGenre(genre: MatChipSelectionChange) {
		const deselect = !genre.selected;
		if (deselect) this.resetSearch();
		this.searchForm.controls.genre.setValue(deselect ? '' : genre.source.value, {
			emitEvent: !deselect,
		});
	}

	searchTerm(title: string) {
		this.isLoading = true;
		this.searchForm.controls.title.setValue(title, { onlySelf: true, emitEvent: false });
		this.advancedSearch(title);
	}

	resetSearch() {
		this.isLoading = true;
		this.searchForm.controls.title.setValue('', { onlySelf: true, emitEvent: false });
		if (this.typeSearch === 'series') {
			this.getSeries();
		} else {
			this.getMovies();
		}
	}

	trackByFn(index: number) {
		return index;
	}

	scrollRight() {
		const chips = document.querySelector<HTMLDivElement>('.mdc-evolution-chip-set__chips');

		if (chips) {
			const scrollLeft = chips.scrollLeft;
			const clientWidth = chips.clientWidth;
			if (clientWidth - scrollLeft >= SCROLL_SIZE) {
				this.arrowsDisabled.left = false;
				chips.scrollTo({ left: (chips.scrollLeft += SCROLL_SIZE), behavior: 'smooth' });
			} else {
				this.arrowsDisabled.right = true;
			}
		}
	}

	scrollLeft() {
		const chips = document.querySelector<HTMLDivElement>('.mdc-evolution-chip-set__chips');

		if (chips) {
			const scrollLeft = chips.scrollLeft;
			chips.scrollTo({ left: (chips.scrollLeft -= 200), behavior: 'smooth' });
			if (scrollLeft > 0) {
				this.arrowsDisabled.right = false;
				chips.scrollTo({ left: (chips.scrollLeft -= SCROLL_SIZE), behavior: 'smooth' });
				if (scrollLeft === SCROLL_SIZE) {
					this.arrowsDisabled.left = true;
				}
			} else {
				this.arrowsDisabled.left = true;
			}
		}
	}

	private advancedSearch(title?: string, genre?: string, type?: 'tv_movie' | 'tv_series') {
		this.movieService
			.getAdvancedSearch(title, genre, type)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe({
				next: value => {
					this.results = value;
					if (this.results.length === 0) {
						this.notResults = true;
					}
				},
				error: () => (this.results = []),
			});
	}

	private getMovies(): void {
		this.movieService
			.getMostPopularMovies()
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe({
				next: value => {
					this.results = value;
				},
			});
	}

	private getSeries(): void {
		this.movieService
			.getMostPopularTVs()
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe({
				next: value => {
					this.results = value;
				},
			});
	}

	ngOnDestroy(): void {
		this._destroyed.next();
		this._destroyed.complete();
	}
}
