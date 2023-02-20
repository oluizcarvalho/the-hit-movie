import { Component, Input } from '@angular/core';
import { MovieGeneric } from '../../models/movie.model';

@Component({
	selector: 'app-list-poster',
	templateUrl: './list-poster.component.html',
	styleUrls: ['./list-poster.component.scss'],
})
export class ListPosterComponent {
	@Input() listPoster: MovieGeneric[] = [];
	@Input() titleSection: string = '';
	@Input() isLoading = true;
	@Input() countPosters: number = 0;
	@Input() widthSkeletonImages: number = 100;

	trackByFn(index: number) {
		return index;
	}
}
