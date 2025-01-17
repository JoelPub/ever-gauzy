import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICountry, IPagination } from '@gauzy/contracts';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { API_PREFIX } from '../constants/app.constants';

@UntilDestroy()
@Injectable()
export class CountryService {
	private _countries$: BehaviorSubject<ICountry[]> = new BehaviorSubject([]);
	public countries$: Observable<ICountry[]> = this._countries$.asObservable();

	public find$: Subject<boolean> = new Subject();

	constructor(private http: HttpClient) {
		this._loadCountries();
	}

	private _loadCountries() {
		this.find$
			.pipe(
				filter((val: boolean) => val === true),
				tap(() => this.getAll()),
				untilDestroyed(this)
			)
			.subscribe();
	}

	getAll() {
		const currencies$ = this._countries$.getValue();
		if (currencies$.length > 0) {
			return EMPTY;
		}
		return this.http
			// .get<IPagination<ICountry>>(`${API_PREFIX}/country`)
			.get<IPagination<ICountry>>(`https://run.mocky.io/v3/3aa49620-cf68-4890-9a1a-b2c72f8669b0`)
			.pipe(
				map(({ items, total }) => {
					this._countries$.next(items);
					return { items, total };
				}),
				untilDestroyed(this)
			)
			.subscribe();
	}
}
