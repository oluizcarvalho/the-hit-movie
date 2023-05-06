import { Component, OnInit } from '@angular/core';
import { CheckForUpdateService } from './shared/services/check-for-update.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'The Hit Movie';

	constructor(private readonly checkForUpdate: CheckForUpdateService) {}

	ngOnInit(): void {
		this.checkForUpdate.init();
	}
}
