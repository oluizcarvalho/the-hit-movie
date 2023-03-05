export const listGenres = [
	'Action',
	'Comedy',
	'Family',
	'History',
	'Mystery',
	'Sci-Fi',
	'War',
	'Adventure',
	'Crime',
	'Fantasy',
	'Horror',
	'News',
	'Sport',
	'Western',
	'Animation',
	'Documentary',
	'Film-Noir',
	'Music',
	'Reality-TV',
	'Talk-Show',
	'Biography',
	'Drama',
	'Game-Show',
	'Musical',
	'Romance',
	'Thriller',
];

export function capitalizeText(text: string | null): string {
	if (!text) return '';
	return text.charAt(0).toUpperCase() + text.slice(1);
}
