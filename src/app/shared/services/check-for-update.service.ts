import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class CheckForUpdateService {
	constructor(private readonly appRef: ApplicationRef, private readonly swUpdate: SwUpdate) {}

	public init(): void {
		this.setPromptUpdate();
	}

	private setPromptUpdate(): void {
		this.swUpdate.versionUpdates
			.pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
			.subscribe(() => {
				window.location.reload();
			});
	}
}
