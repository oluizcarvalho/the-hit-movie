export interface Result {
	id: string;
	resultType: string;
	image: string;
	title: string;
	description: string;
}

export interface GetSearchTitle {
	searchType: string;
	expression: string;
	results: Result[];
	errorMessage: string;
}
