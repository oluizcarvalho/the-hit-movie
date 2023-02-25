import { Observable } from 'rxjs';

export abstract class AbstractCacheService<T> {
	readonly CACHE_DURATION_IN_MINUTES = 30;
	readonly DEFAULT_KEY = 'DEFAULT';

	private cache: {
		[id: string]: {
			expires: Date;
			value: Observable<T>;
		};
	} = {};

	getValue(object: string): Observable<T> | null {
		const key = object ?? this.DEFAULT_KEY;
		let item = this.cache[key];
		if (!item) {
			return null;
		}
		if (new Date() > this.cache[key].expires) {
			return null;
		}

		return item.value;
	}

	setValue(value: Observable<T>, object: string) {
		const key = object ?? this.DEFAULT_KEY;
		let expires = new Date();
		expires.setMinutes(expires.getMinutes() + this.CACHE_DURATION_IN_MINUTES);
		this.cache[key] = { expires, value };
	}

	clearCache() {
		this.cache = {};
	}
}
