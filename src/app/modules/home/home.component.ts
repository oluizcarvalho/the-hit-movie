import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { Movie } from '../../shared/models/movie.model';

const QUANTITY_OF_FILMS = 2;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	public moviesList: Movie[] = [];

	constructor(private movieService: MovieService) {}

	ngOnInit(): void {
		this.getInTheaters();
	}

	private getInTheaters(): void {
		this.movieService.getInTheaters().subscribe({
			next: value => {
				this.moviesList = value.items.slice(0, QUANTITY_OF_FILMS);
				this.moviesList.forEach((movie, index) => {
					this.getPostersById(movie.id, index);
				});
			},
		});
	}

	private getPostersById(id: string, index: number) {
		this.movieService.getPosters(id).subscribe({
			next: value => {
				this.moviesList[index].backdrops = value.backdrops;
			},
		});
	}
}
