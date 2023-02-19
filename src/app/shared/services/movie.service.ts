import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiKeyService } from '../../core/services/api-key.service';
import { GetMovies, GetPosters, Movie } from '../models/movie.model';
import { GetSearchTitle } from '../models/search-movie.model';
import { GetFanFavorites } from '../models/imdb.model';
import { AbstractCacheService } from '../../core/services/cache.service';
import { map, shareReplay } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class MovieService extends AbstractCacheService<Movie[]> {
	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient, private apiKey: ApiKeyService) {
		super();
	}

	getSearchTitle(term: string) {
		return this.http.get<GetSearchTitle>(this.baseUrl + `/Search/${this.apiKey.value}/${term}`);
	}

	getInTheaters() {
		let movies$ = this.getValue('InTheaters');
		if (!movies$) {
			movies$ = this.http.get<GetMovies>(this.baseUrl + `/InTheaters/${this.apiKey.value}`).pipe(
				map(res => res.items),
				shareReplay(1)
			);
			this.setValue(movies$, 'InTheaters');
		}
		return movies$;
	}

	getComingSoon() {
		let movies$ = this.getValue('ComingSoon');
		if (!movies$) {
			movies$ = this.http.get<GetMovies>(this.baseUrl + `/ComingSoon/${this.apiKey.value}`).pipe(
				map(res => res.items),
				shareReplay(1)
			);
			this.setValue(movies$, 'ComingSoon');
		}
		return movies$;
	}

	getFanFavorites() {
		let headers = new HttpHeaders();
		headers = headers.append('content-type', 'application/json');
		headers = headers.append('x-amzn-sessionid', '139-6409339-7450046');
		headers = headers.append('x-imdb-client-name', 'imdb-web-next-localized');
		headers = headers.append('x-imdb-client-rid', 'CCKQ50QWYBGFGDRK3H7Y');
		headers = headers.append(
			'cookie',
			'session-id=139-6409339-7450046; session-id-time=2082787201l; uu=eyJpZCI6InV1MzZhOGZhYjU5NDhmNGQ1OTk2YjciLCJwcmVmZXJlbmNlcyI6eyJmaW5kX2luY2x1ZGVfYWR1bHQiOmZhbHNlfX0=; ubid-main=132-9424126-6383051; session-token=ObZxrLpBFVDTcabifAfJ7cxi6iE7WKewY8jNz4RXHfPSzj97Yb9FIv0vYbXmubtIGW6Arl3WOUdmYydFnvq1MOjK1g4vrhShohJtqm8T5TsFEAZLVBs/UwHvcIvZYw6qIAJvd6qf3S1FlRhkKv3FnQmvoD75OAuGhJnNVXmsydc2WBFeSjpa70M/XCNW61maF30Iq4CB3SLqL56MCT7jdg=='
		);

		const url =
			'https://api.graphql.imdb.com/?operationName=FanFavoritesHomepage&variables=%7B%22fanPicksFirst%22%3A30%2C%22isLoggedIn%22%3Afalse%2C%22locale%22%3A%22pt-BR%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22sha256Hash%22%3A%22131c3539e4dda95c7d2ef04c36862fd29e452e8c3cf25f107b5cd6606bb2aded%22%2C%22version%22%3A1%7D%7D';
		return this.http.get<GetFanFavorites>(url, { headers });
	}

	getPosters(id: string) {
		return this.http.get<GetPosters>(this.baseUrl + `/Posters/${this.apiKey.value}/${id}`);
	}
}
