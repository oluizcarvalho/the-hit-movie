export interface KnownFor {
	id: string;
	title: string;
	fullTitle: string;
	year: string;
	role: string;
	image: string;
}

export interface CastMovy {
	id: string;
	role: string;
	title: string;
	year: string;
	description: string;
}

export interface GetPeopleDetails {
	id: string;
	name: string;
	role: string;
	image: string;
	summary: string;
	birthDate: string;
	deathDate?: any;
	awards: string;
	height: string;
	knownFor: KnownFor[];
	castMovies: CastMovy[];
	errorMessage: string;
}
