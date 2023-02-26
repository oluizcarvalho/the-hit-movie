import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { scrollToTop } from '../../shared/helpers/dom.helper';
import { listGenres } from '../../shared/helpers/options.helper';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, merge } from 'rxjs';

interface SearchForm {
	term: FormControl<string>;
	genre: FormControl<string>;
}

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
	public typeSearch!: string;
	public isLoading: boolean = true;
	public listGenres = listGenres;
	public searchForm = new FormGroup<SearchForm>({
		term: new FormControl('', { nonNullable: true }),
		genre: new FormControl('', { nonNullable: true }),
	});
	constructor(private route: ActivatedRoute, private movieService: MovieService) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.typeSearch = params.get('type') || '';
			this.isLoading = true;
			scrollToTop();
		});
		merge(
			this.searchForm.controls.term?.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()),
			this.searchForm.controls.genre?.valueChanges.pipe(distinctUntilChanged())
		).subscribe(() => {});
	}

	onSelectGenre(genre: string) {
		this.searchForm.get('genre')?.setValue(genre);
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
}
