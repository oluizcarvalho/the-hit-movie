import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiKeyService } from '../../core/services/api-key.service';
import { GetMovies, GetPosters } from '../models/movie.model';
import { GetSearchTitle } from '../models/search-movie.model';
import { GetFanFavorites } from '../models/imdb.model';

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	private baseUrl = environment.baseUrl;
	constructor(private http: HttpClient, private apiKey: ApiKeyService) {}

	getSearchTitle(term: string) {
		return this.http.get<GetSearchTitle>(this.baseUrl + `/Search/${this.apiKey.value}/${term}`);
	}

	getInTheaters() {
		return this.http.get<GetMovies>(this.baseUrl + `/InTheaters/${this.apiKey.value}`);
	}

	getComingSoon() {
		return this.http.get<GetMovies>(this.baseUrl + `/ComingSoon/${this.apiKey.value}`);
	}

	getFanFavorites() {
		let headers = new HttpHeaders();
		headers = headers.append('content-type', 'application/json');
		headers = headers.append('x-amzn-sessionid', '139-6409339-7450046');

		const url =
			'https://api.graphql.imdb.com/?operationName=FanFavoritesHomepage&variables=%7B%22fanPicksFirst%22%3A30%2C%22isLoggedIn%22%3Afalse%2C%22locale%22%3A%22pt-BR%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22sha256Hash%22%3A%22131c3539e4dda95c7d2ef04c36862fd29e452e8c3cf25f107b5cd6606bb2aded%22%2C%22version%22%3A1%7D%7D';
		return this.http.get<GetFanFavorites>(url, { headers });
	}

	getPosters(id: string) {
		return this.http.get<GetPosters>(this.baseUrl + `/Posters/${this.apiKey.value}/${id}`);
	}
}
