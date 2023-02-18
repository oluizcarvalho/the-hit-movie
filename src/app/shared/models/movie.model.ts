export interface GenreList {
	key: string;
	value: string;
}

export interface DirectorList {
	id: string;
	name: string;
}

export interface StarList {
	id: string;
	name: string;
}

export interface Movie {
	id: string;
	title: string;
	fullTitle: string;
	year: string;
	releaseState: string;
	image: string;
	runtimeMins?: string;
	runtimeStr?: string;
	plot?: string;
	contentRating?: string;
	imDbRating?: string;
	imDbRatingCount?: string;
	metacriticRating?: string;
	genres: string;
	genreList: GenreList[];
	directors: string;
	directorList?: DirectorList[];
	stars: string;
	starList: StarList[];
}

export interface GetMovies {
	items: Movie[];
	errorMessage: string;
}

export interface Poster {
	id: string;
	link: string;
	aspectRatio: number;
	language: string;
	width: number;
	height: number;
}

export interface Backdrop {
	id: string;
	link: string;
	aspectRatio: number;
	language: string;
	width: number;
	height: number;
}

export interface GetPosters {
	imDbId: string;
	title: string;
	fullTitle: string;
	type: string;
	year: string;
	posters: Poster[];
	backdrops: Backdrop[];
	errorMessage: string;
}
