import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiKeyService } from '../../core/services/api-key.service';
import { GetInTheaters, GetPosters } from '../models/movie.model';
import { GetSearchTitle } from '../models/search-movie.model';

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
		return this.http.get<GetInTheaters>(this.baseUrl + `/InTheaters/${this.apiKey.value}`);
	}

	getPosters(id: string) {
		return this.http.get<GetPosters>(this.baseUrl + `/Posters/${this.apiKey.value}/${id}`);
	}
}
