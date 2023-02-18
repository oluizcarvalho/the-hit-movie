import { Observable } from 'rxjs';
import hash from 'hash-it';
import * as dayjs from 'dayjs';

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
		const key = object ? hash(object).toString() : this.DEFAULT_KEY;
		let item = this.cache[key];
		if (!item) {
			return null;
		}
		if (dayjs(new Date()).isAfter(item.expires)) {
			return null;
		}

		return item.value;
	}

	setValue(value: Observable<T>, object: string) {
		const key = object ? hash(object).toString() : this.DEFAULT_KEY;
		const expires = dayjs(new Date()).add(this.CACHE_DURATION_IN_MINUTES, 'minute').toDate();
		this.cache[key] = { expires, value };
	}

	clearCache() {
		this.cache = {};
	}
}
