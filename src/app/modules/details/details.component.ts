import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { finalize } from 'rxjs/operators';
import { DetailsModel } from '../../shared/models/details.model';
import { SwiperOptions } from 'swiper';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
	public tt: string = '';
	public isLoading: boolean = true;
	public details!: DetailsModel;
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
	constructor(private route: ActivatedRoute, private movieService: MovieService) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.tt = params.get('tt') || '';
			this.isLoading = true;
			this.scrollToTop();
			if (this.tt) this.getDetailsMovie(this.tt);
		});
	}

	trackByFn(index: number) {
		return index;
	}

	private getDetailsMovie(tt: string): void {
		this.movieService
			.getDetails(tt)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe({
				next: value => {
					this.details = value;
				},
			});
	}

	private scrollToTop(): void {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}
}
