import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieGeneric } from '../../models/movie.model';
import SwiperCore, { Navigation, Mousewheel, SwiperOptions } from 'swiper';

SwiperCore.use([Navigation, Mousewheel]);

@Component({
	selector: 'app-list-poster',
	templateUrl: './list-poster.component.html',
	styleUrls: ['./list-poster.component.scss'],
})
export class ListPosterComponent {
	@Input() listPoster: MovieGeneric[] = [];
	@Input() titleSection: string = '';
	@Input() isLoading = true;
	@Input() countPosters: number = 5;
	@Input() widthSkeletonImages: number = 100;
	@Input() showRole: boolean = false;
	@Output() navigateEvent = new EventEmitter<MovieGeneric>();

	public config: SwiperOptions = {
		initialSlide: 0,
		navigation: true,
		grabCursor: true,
		scrollbar: false,
		centeredSlides: false,
		slidesPerView: 'auto',
		allowTouchMove: true,
		mousewheel: {
			eventsTarget: 'container',
			forceToAxis: true,
		},
		spaceBetween: 10,
	};

	trackByFn(index: number) {
		return index;
	}

	navigateChange(movie: MovieGeneric): void {
		this.navigateEvent.next(movie);
	}
}
