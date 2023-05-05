import { Component, OnInit } from '@angular/core';
import { GetPeopleDetails } from '../../shared/models/people.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { scrollToTop } from '../../shared/helpers/dom.helper';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'app-people-details',
	templateUrl: './people-details.component.html',
	styleUrls: ['./people-details.component.scss'],
})
export class PeopleDetailsComponent implements OnInit {
	peopleDetails!: GetPeopleDetails;
	nm!: string;
	isLoading = false;
	constructor(private route: ActivatedRoute, private movieService: MovieService) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.nm = params.get('nm') || '';
			this.isLoading = true;
			scrollToTop();
			if (this.nm) this.getPeopleDetails(this.nm);
		});
	}

	private getPeopleDetails(nm: string) {
		this.movieService
			.getPeople(nm)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe({
				next: value => {
					this.peopleDetails = value;
				},
			});
	}
}
