import { GenreList, StarList } from './movie.model';

export interface DirectorList {
	id: string;
	name: string;
}

export interface WriterList {
	id: string;
	name: string;
}

export interface ActorList {
	id: string;
	image: string;
	name: string;
	asCharacter: string;
}

export interface CompanyList {
	id: string;
	name: string;
}

export interface CountryList {
	key: string;
	value: string;
}

export interface LanguageList {
	key: string;
	value: string;
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
	link?: string;
	aspectRatio: number;
	language: string;
	width: number;
	height: number;
}

export interface Posters {
	imDbId: string;
	title?: string;
	fullTitle: string;
	type: string;
	year: string;
	posters: Poster[];
	backdrops: Backdrop[];
	errorMessage: string;
}

export interface BoxOffice {
	budget: string;
	openingWeekendUSA: string;
	grossUSA: string;
	cumulativeWorldwideGross: string;
}

export interface Similar {
	id: string;
	title: string;
	image: string;
	imDbRating: string;
}

export interface CreatorList {
	id: string;
	name: string;
}

export interface TvSeriesInfo {
	yearEnd: string;
	creators: string;
	creatorList: CreatorList[];
	seasons: string[];
}

export interface DetailsModel {
	id: string;
	title: string;
	originalTitle: string;
	fullTitle: string;
	type: string;
	year: string;
	image: string;
	releaseDate: string;
	runtimeMins: string | null;
	runtimeStr: string | null;
	plot: string;
	plotLocal: string;
	plotLocalIsRtl: boolean;
	awards: string;
	directors: string;
	directorList: DirectorList[];
	writers: string;
	writerList: WriterList[];
	stars: string;
	starList: StarList[];
	actorList: ActorList[];
	fullCast?: any;
	genres: string;
	genreList: GenreList[];
	companies: string;
	companyList: CompanyList[];
	countries: string;
	countryList: CountryList[];
	languages: string;
	languageList: LanguageList[];
	contentRating: string;
	imDbRating: string;
	imDbRatingVotes: string;
	metacriticRating: string;
	ratings?: any;
	wikipedia?: any;
	posters: Posters;
	images?: any;
	trailer?: any;
	boxOffice: BoxOffice;
	tagline?: any;
	keywords: string;
	keywordList: string[];
	similars: Similar[];
	tvSeriesInfo?: TvSeriesInfo;
	tvEpisodeInfo?: any;
	errorMessage: string;
}
