import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { scrollToTop } from '../../shared/helpers/dom.helper';
import { listGenres } from '../../shared/helpers/options.helper';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

interface SearchForm {
	term: FormControl<string>;
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
	});
	constructor(private route: ActivatedRoute, private movieService: MovieService) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.typeSearch = params.get('type') || '';
			this.isLoading = true;
			scrollToTop();
		});
		this.searchForm
			.get('term')
			?.valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
			.subscribe(value => console.log(value));
	}

	onSelectGenre(genre: string) {
		console.log(genre);
	}

	trackByFn(index: number) {
		return index;
	}
}
