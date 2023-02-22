import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { finalize } from 'rxjs/operators';
import { DetailsModel } from '../../shared/models/details.model';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
	tt: string = '';
	loading: boolean = false;
	details!: DetailsModel;
	constructor(private route: ActivatedRoute, private movieService: MovieService) {
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.tt = params.get('tt') || '';
		});
	}

	ngOnInit(): void {
		console.log(this.tt);
		if (this.tt) this.getDetailsMovie(this.tt);
	}

	private getDetailsMovie(tt: string) {
		this.loading = true;
		this.movieService
			.getDetails(tt)
			.pipe(finalize(() => (this.loading = false)))
			.subscribe({
				next: value => {
					this.details = value;
				},
			});
	}
}
