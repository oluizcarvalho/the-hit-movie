import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { DetailsModel } from '../../shared/models/details.model';
import { SwiperOptions } from 'swiper';
import { scrollToTop } from '../../shared/helpers/dom.helper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { MovieGeneric } from '../../shared/models/movie.model';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
	public tt: string = '';
	public isLoading: boolean = true;
	public details!: DetailsModel;
	public isMobile: boolean = false;
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
	private _destroyed = new Subject<void>();

	constructor(
		private route: ActivatedRoute,
		private movieService: MovieService,
		private readonly breakpointObserver: BreakpointObserver,
		private readonly router: Router
	) {
		this.breakpointObserver
			.observe([Breakpoints.HandsetPortrait])
			.pipe(takeUntil(this._destroyed))
			.subscribe(result => {
				this.isMobile = result.matches;
			});
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.tt = params.get('tt') || '';
			this.isLoading = true;
			scrollToTop();
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
					if (this.details.errorMessage) {
						this.errorCallbackDetails();
					}
				},
				error: () => {
					this.errorCallbackDetails();
				},
			});
	}

	private errorCallbackDetails(): void {
		if (this.movieService.movieDetails) {
			this.details = <DetailsModel>this.movieService.movieDetails;
		}
	}

	ngOnDestroy(): void {
		this._destroyed.next();
		this._destroyed.complete();
	}

	async navigateToDetails(movie: MovieGeneric) {
		this.movieService.movieDetails = movie;
		await this.router.navigate(['/details', movie?.id]);
	}
}
