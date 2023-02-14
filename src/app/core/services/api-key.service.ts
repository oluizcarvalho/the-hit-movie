import { Injectable } from '@angular/core';

const API_KEYS = ['k_rnlpdi92', 'k_rnlpdi92', 'k_rnlpdi92'];

@Injectable({
	providedIn: 'root',
})
export class ApiKeyService {
	private _index = 0;
	constructor() {}

	get value(): string {
		return API_KEYS[this.getIndexKey()];
	}

	private getIndexKey(): number {
		if (this._index === API_KEYS.length - 1) {
			this._index = 0;
		} else {
			this._index++;
		}
		console.log(this._index);
		return this._index;
	}
}
