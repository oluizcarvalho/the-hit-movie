import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiKeyService } from '../../core/services/api-key.service';
import { GetMovies, GetMoviesGeneric, GetPosters, MovieGeneric } from '../models/movie.model';
import { GetSearchTitle } from '../models/search-movie.model';
import { AbstractCacheService } from '../../core/services/cache.service';
import { map, shareReplay } from 'rxjs';

enum KEYS {
	InTheaters = 'InTheaters',
	ComingSoon = 'ComingSoon',
	Top250Movies = 'Top250Movies',
	Top250TVs = 'Top250TVs',
	MostPopularMovies = 'MostPopularMovies',
	MostPopularTVs = 'MostPopularTVs',
}

@Injectable({
	providedIn: 'root',
})
export class MovieService extends AbstractCacheService<MovieGeneric[]> {
	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient, private apiKey: ApiKeyService) {
		super();
	}

	getSearchTitle(term: string) {
		return this.http.get<GetSearchTitle>(this.baseUrl + `/Search/${this.apiKey.value}/${term}`);
	}

	getInTheaters() {
		let observable$ = this.getValue(KEYS.InTheaters);
		if (!observable$) {
			observable$ = this.http.get<GetMovies>(this.baseUrl + `/InTheaters/${this.apiKey.value}`).pipe(
				map(res => res.items),
				shareReplay(1)
			);
			this.setValue(observable$, KEYS.InTheaters);
		}
		return observable$;
	}

	getComingSoon() {
		let observable$ = this.getValue(KEYS.ComingSoon);
		if (!observable$) {
			observable$ = this.http.get<GetMovies>(this.baseUrl + `/ComingSoon/${this.apiKey.value}`).pipe(
				map(res => res.items),
				shareReplay(1)
			);
			this.setValue(observable$, KEYS.ComingSoon);
		}
		return observable$;
	}

	getTop250Movies() {
		let observable$ = this.getValue(KEYS.Top250Movies);
		if (!observable$) {
			observable$ = this.http.get<GetMoviesGeneric>(this.baseUrl + `/Top250Movies/${this.apiKey.value}`).pipe(
				map(res => res.items),
				shareReplay(1)
			);
			this.setValue(observable$, KEYS.Top250Movies);
		}
		return observable$;
	}

	getTop250TVs() {
		let observable$ = this.getValue(KEYS.Top250TVs);
		if (!observable$) {
			observable$ = this.http.get<GetMoviesGeneric>(this.baseUrl + `/Top250TVs/${this.apiKey.value}`).pipe(
				map(res => res.items),
				shareReplay(1)
			);
			this.setValue(observable$, KEYS.Top250TVs);
		}
		return observable$;
	}

	getMostPopularMovies() {
		let observable$ = this.getValue(KEYS.MostPopularMovies);
		if (!observable$) {
			observable$ = this.http.get<GetMoviesGeneric>(this.baseUrl + `/MostPopularMovies/${this.apiKey.value}`).pipe(
				map(res => res.items),
				shareReplay(1)
			);
			this.setValue(observable$, KEYS.MostPopularMovies);
		}
		return observable$;
	}

	getMostPopularTVs() {
		let observable$ = this.getValue(KEYS.MostPopularTVs);
		if (!observable$) {
			observable$ = this.http.get<GetMoviesGeneric>(this.baseUrl + `/MostPopularTVs/${this.apiKey.value}`).pipe(
				map(res => res.items),
				shareReplay(1)
			);
			this.setValue(observable$, KEYS.MostPopularTVs);
		}
		return observable$;
	}

	getPosters(id: string) {
		return this.http.get<GetPosters>(this.baseUrl + `/Posters/${this.apiKey.value}/${id}`);
	}
}
