import { Component, Input } from '@angular/core';
import { MovieGeneric } from '../../models/movie.model';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';

SwiperCore.use([Navigation]);

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

	public config: SwiperOptions = {
		initialSlide: 0,
		navigation: true,
		grabCursor: true,
		scrollbar: false,
		centeredSlides: false,
		slidesPerView: 'auto',
		allowTouchMove: true,
		spaceBetween: 10,
	};

	trackByFn(index: number) {
		return index;
	}
}
