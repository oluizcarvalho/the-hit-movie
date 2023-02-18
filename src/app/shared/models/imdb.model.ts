export interface TitleText {
	text: string;
}

export interface TitleType {
	id: string;
	text: string;
	canHaveEpisodes: boolean;
}

export interface OriginalTitleText {
	text: string;
}

export interface Caption {
	plainText: string;
}

export interface PrimaryImage {
	id: string;
	width: number;
	height: number;
	url: string;
	caption: Caption;
}

export interface ReleaseYear {
	year: number;
	endYear?: number;
}

export interface RatingsSummary {
	aggregateRating: number;
	voteCount: number;
}

export interface Runtime {
	seconds: number;
}

export interface Certificate {
	rating: string;
}

export interface CanRate {
	isRatable: boolean;
}

export interface Genre {
	text: string;
}

export interface TitleCardGenres {
	genres: Genre[];
}

export interface LatestTrailer {
	id: string;
}

export interface PrimaryWatchOption {
	additionalWatchOptionsCount: number;
}

export interface Node {
	id: string;
	titleText: TitleText;
	titleType: TitleType;
	originalTitleText: OriginalTitleText;
	primaryImage: PrimaryImage;
	releaseYear: ReleaseYear;
	ratingsSummary: RatingsSummary;
	runtime: Runtime;
	certificate: Certificate;
	canRate: CanRate;
	titleCardGenres: TitleCardGenres;
	canHaveEpisodes: boolean;
	latestTrailer: LatestTrailer;
	primaryWatchOption: PrimaryWatchOption;
}

export interface Edge {
	node: Node;
}

export interface RefTag {
	ep13nReftag: string;
}

export interface FanPicksTitles {
	edges: Edge[];
	refTag: RefTag;
}

export interface Data {
	fanPicksTitles: FanPicksTitles;
}

export interface ExperimentalFields {
	watch: any[];
	ratings: any[];
	video: any[];
	janet: any[];
	markdown: any[];
}

export interface Extensions {
	disclaimer: string;
	experimentalFields: ExperimentalFields;
}

export interface GetFanFavorites {
	data: Data;
	extensions: Extensions;
}
