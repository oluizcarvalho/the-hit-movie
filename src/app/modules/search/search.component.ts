import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { scrollToTop } from '../../shared/helpers/dom.helper';
import { listGenres } from '../../shared/helpers/options.helper';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, merge } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MovieGeneric } from '../../shared/models/movie.model';

interface SearchForm {
	title: FormControl<string>;
	genre: FormControl<string>;
}

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
	public typeSearch!: string;
	public isLoading: boolean = false;
	public listGenres = listGenres;
	public results: MovieGeneric[] = [];
	public notResults: boolean = false;
	public searchForm = new FormGroup<SearchForm>({
		title: new FormControl('', { nonNullable: true }),
		genre: new FormControl('', { nonNullable: true }),
	});
	public type = new Map<string, 'tv_movie' | 'tv_series'>([
		['movies', 'tv_movie'],
		['series', 'tv_series'],
	]);
	constructor(private route: ActivatedRoute, private movieService: MovieService) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.typeSearch = params.get('type') || '';
			this.searchForm.reset({ genre: '', title: '' }, { emitEvent: false });
			this.results = [];
			if (this.typeSearch === 'series') {
				this.getSeries();
			} else {
				this.getMovies();
			}
			scrollToTop();
		});
		merge(
			this.searchForm.controls.title?.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()),
			this.searchForm.controls.genre?.valueChanges.pipe(distinctUntilChanged())
		).subscribe(() => {
			if (!this.isLoading) {
				this.isLoading = true;
				const type = this.type.get(this.typeSearch);
				const { title, genre } = this.searchForm.getRawValue();
				this.advancedSearch(title, genre, type);
			}
		});
	}

	onSelectGenre(genre: string) {
		let genreSelected = this.searchForm.controls.genre.value;
		this.searchForm.controls.genre.setValue(genre === genreSelected ? '' : genre, { onlySelf: true });
	}

	searchTerm(title: string) {
		this.isLoading = true;
		this.searchForm.controls.title.setValue(title, { onlySelf: true, emitEvent: false });
		this.advancedSearch(title);
	}

	trackByFn(index: number) {
		return index;
	}

	scrollRight() {
		const chips = document.querySelector<HTMLDivElement>('.mdc-evolution-chip-set__chips');
		if (chips) {
			chips.scrollTo({ left: (chips.scrollLeft += 200), behavior: 'smooth' });
		}
	}

	scrollLeft() {
		const chips = document.querySelector<HTMLDivElement>('.mdc-evolution-chip-set__chips');
		if (chips) {
			chips.scrollTo({ left: (chips.scrollLeft -= 200), behavior: 'smooth' });
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
				error: err => (this.results = []),
			});
	}

	private getMovies(): void {
		this.movieService.getMostPopularMovies().subscribe({
			next: value => {
				this.results = value;
			},
		});
	}

	private getSeries(): void {
		this.movieService.getMostPopularTVs().subscribe({
			next: value => {
				this.results = value;
			},
		});
	}
}
