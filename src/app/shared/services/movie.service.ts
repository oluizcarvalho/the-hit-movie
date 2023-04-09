import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiKeyService } from '../../core/services/api-key.service';
import { GetMovies, GetMoviesGeneric, GetPosters, MovieGeneric } from '../models/movie.model';
import { GetAdvancedSearch, GetSearchTitle } from '../models/search-movie.model';
import { AbstractCacheService } from '../../core/services/cache.service';
import { map, shareReplay } from 'rxjs';
import { DetailsModel } from '../models/details.model';
import { catchError } from 'rxjs/operators';

enum KEYS {
	InTheaters = 'InTheaters',
	ComingSoon = 'ComingSoon',
	Top250Movies = 'Top250Movies',
	Top250TVs = 'Top250TVs',
	MostPopularMovies = 'MostPopularMovies',
	MostPopularTVs = 'MostPopularTVs',
}

const GENERIC_TYPE = 'feature,tv_movie,tv_series';

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

	getSearchTitleMovie(term: string) {
		return this.http.get<GetSearchTitle>(this.baseUrl + `/SearchMovie/${this.apiKey.value}/${term}`);
	}

	getSearchTitleSeries(term: string) {
		return this.http.get<GetSearchTitle>(this.baseUrl + `/SearchSeries/${this.apiKey.value}/${term}`);
	}

	getJson(url: string) {
		return this.http.get<any>(`/assets/json/${url}.json`).pipe(map(res => res.items));
	}

	getAdvancedSearch(title?: string, genre?: string, type?: 'tv_movie' | 'tv_series') {
		let params = new HttpParams();
		params = params.set('title_type', type ?? GENERIC_TYPE);
		if (title) params = params.set('title', title);
		if (genre) params = params.set('genres', genre);
		let observable$ = this.getValue(params.toString());
		if (!observable$) {
			observable$ = this.http
				.get<GetAdvancedSearch>(this.baseUrl + `/AdvancedSearch/${this.apiKey.value}`, { params })
				.pipe(
					map(res => res.results?.filter(movie => !movie.image?.includes('nopicture'))),
					shareReplay(1)
				);
			this.setValue(observable$, params.toString());
		}

		return observable$;
	}

	getInTheaters() {
		let observable$ = this.getValue(KEYS.InTheaters);
		if (!observable$) {
			observable$ = this.http.get<GetMovies>(this.baseUrl + `/InTheaters/${this.apiKey.value}`).pipe(
				map(res => res.items),
				shareReplay(1),
				catchError(() => {
					return this.getJson(KEYS.InTheaters);
				})
			);
			this.setValue(observable$, KEYS.InTheaters);
		}
		return observable$;
	}

	getComingSoon() {
		let observable$ = this.getValue(KEYS.ComingSoon);
		if (!observable$) {
			observable$ = this.http.get<GetMovies>(this.baseUrl + `/ComingSoon/${this.apiKey.value}`).pipe(
				map(res => res.items?.filter(movie => !movie.image?.includes('nopicture'))),
				shareReplay(1),
				catchError(() => {
					return this.getJson(KEYS.ComingSoon);
				})
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
				shareReplay(1),
				catchError(() => {
					return this.getJson(KEYS.MostPopularMovies);
				})
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
				shareReplay(1),
				catchError(() => {
					return this.getJson(KEYS.MostPopularTVs);
				})
			);
			this.setValue(observable$, KEYS.MostPopularTVs);
		}
		return observable$;
	}

	getDetails(tt: string) {
		return this.http.get<DetailsModel>(`${this.baseUrl}/Title/${this.apiKey.value}/${tt}/Posters,`);
	}

	getPosters(tt: string) {
		return this.http.get<GetPosters>(`${this.baseUrl}/Posters/${this.apiKey.value}/${tt}`);
	}
}
