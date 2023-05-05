import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { MovieGeneric } from '../../shared/models/movie.model';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import SwiperCore, { Autoplay, Lazy, Navigation, Pagination, SwiperOptions } from 'swiper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { forkJoin, of, Subject } from 'rxjs';
import { Router } from '@angular/router';

const COUNT_THEATERS = 10;
const COUNT_COMING_SOON = 20;
const COUNT_MOST_POPULAR = 20;

const COUNT_POSTER_SWIPER = new Map([
	[Breakpoints.XSmall, 1],
	[Breakpoints.Small, 2],
	[Breakpoints.Medium, 3],
	[Breakpoints.Large, 4],
	[Breakpoints.XLarge, 4],
]);

SwiperCore.use([Navigation, Pagination, Lazy, Autoplay]);

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	private _destroyed = new Subject<void>();
	public inTheatersList: MovieGeneric[] = [];
	public comingSoonList: MovieGeneric[] = [];
	public mostPopularMoviesList: MovieGeneric[] = [];
	public mostPopularTVsList: MovieGeneric[] = [];

	public config: SwiperOptions = {
		initialSlide: 4,
		navigation: {
			nextEl: '.swiper-button-next-offer',
			prevEl: '.swiper-button-prev-offer',
		},
		scrollbar: false,
		pagination: {
			clickable: true,
		},
		loop: true,
		autoplay: {
			delay: 5000,
		},
		centeredSlides: false,
		lazy: {
			loadPrevNext: true,
			enabled: true,
		},
		speed: 2000,
		allowTouchMove: true,
		breakpoints: {
			320: {
				slidesPerView: COUNT_POSTER_SWIPER.get(Breakpoints.XSmall),
				spaceBetween: 0,
			},
			600: {
				slidesPerView: COUNT_POSTER_SWIPER.get(Breakpoints.Small),
				spaceBetween: 20,
			},
			960: {
				slidesPerView: COUNT_POSTER_SWIPER.get(Breakpoints.Medium),
				spaceBetween: 20,
			},
			1280: {
				slidesPerView: COUNT_POSTER_SWIPER.get(Breakpoints.Large),
				spaceBetween: 20,
			},
		},
	};

	public isLoading: boolean = false;
	public countPosters: number = 0;
	public widthSkeletonPoster: number = 100;
	public widthSkeletonImages: number = 100;
	constructor(
		private movieService: MovieService,
		private breakpointObserver: BreakpointObserver,
		private router: Router
	) {
		breakpointObserver
			.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
			.pipe(takeUntil(this._destroyed))
			.subscribe(result => {
				for (const query of Object.keys(result.breakpoints)) {
					if (result.breakpoints[query]) {
						this.countPosters = COUNT_POSTER_SWIPER.get(query) ?? 1;
						this.widthSkeletonPoster = this.getCalcWidthPoster(this.countPosters);
						this.widthSkeletonImages = this.getCalcWidthPoster(this.countPosters + 2);
					}
				}
			});
	}

	ngOnInit(): void {
		this.getData();
	}

	trackByFn(index: number) {
		return index;
	}

	async navigateToDetails(movie: MovieGeneric) {
		this.movieService.movieDetails = movie;
		await this.router.navigate(['/details', movie?.id]);
	}

	private getData(): void {
		this.isLoading = true;
		forkJoin([
			this.movieService.getInTheaters().pipe(
				catchError(() => {
					return of(null);
				})
			),
			this.movieService.getComingSoon().pipe(
				catchError(() => {
					return of(null);
				})
			),
			this.movieService.getMostPopularMovies().pipe(
				catchError(() => {
					return of(null);
				})
			),
			this.movieService.getMostPopularTVs().pipe(
				catchError(() => {
					return of(null);
				})
			),
		])
			.pipe(
				finalize(() => {
					this.isLoading = false;
				})
			)
			.subscribe({
				next: value => {
					this.inTheatersList = value[0]?.slice(0, COUNT_THEATERS) ?? [];
					this.comingSoonList = value[1]?.slice(0, COUNT_COMING_SOON) ?? [];
					this.mostPopularMoviesList = value[2]?.slice(0, COUNT_MOST_POPULAR) ?? [];
					this.mostPopularTVsList = value[3]?.slice(0, COUNT_MOST_POPULAR) ?? [];
				},
				error: err => {
					console.error(err);
				},
			});
	}

	private getCalcWidthPoster(countPosters: number): number {
		if (countPosters === 1) return 100;
		return (100 - countPosters) / countPosters;
	}

	ngOnDestroy(): void {
		this._destroyed.next();
		this._destroyed.complete();
	}
}
