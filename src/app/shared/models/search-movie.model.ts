import { MovieGeneric } from './movie.model';

export interface ResultMovie {
	id: string;
	resultType: string;
	image: string;
	title: string;
	description: string;
}

export interface GetSearchTitle {
	searchType: string;
	expression: string;
	results: ResultMovie[];
	errorMessage: string;
}

export interface GetAdvancedSearch {
	queryString: string;
	results: MovieGeneric[];
	errorMessage?: any;
}
