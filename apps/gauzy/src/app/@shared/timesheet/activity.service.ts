import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	IActivity,
	IGetActivitiesInput,
	IDailyActivity
} from '@gauzy/contracts';
import { toParams } from '@gauzy/common-angular';
import { firstValueFrom } from 'rxjs';
import { API_PREFIX } from '../../@core/constants/app.constants';

@Injectable({
	providedIn: 'root'
})
export class ActivityService {
	constructor(private http: HttpClient) { }

	getActivities(request: IGetActivitiesInput) {
		return firstValueFrom(
			this.http.get<IActivity[]>(`${API_PREFIX}/timesheet/activity`, {
				params: toParams(request)
			})
		);
	}

	getDailyActivities(request: IGetActivitiesInput) {
		return firstValueFrom(
			// this.http.get<IDailyActivity[]>(`${API_PREFIX}/timesheet/activity/daily`, {
			this.http.get<IDailyActivity[]>(`https://run.mocky.io/v3/e3f6d743-7f2d-45c7-ae9c-a52fd47b2d63`, {
				params: toParams(request)
			})
		);
	}

	getDailyActivitiesReport(request: IGetActivitiesInput) {
		return firstValueFrom(
			// this.http.get<IDailyActivity[]>(`${API_PREFIX}/timesheet/activity/report`, {
			this.http.get<IDailyActivity[]>(`https://run.mocky.io/v3/fd3885cf-3398-4bf4-be9f-38e3bf635923`, {
				params: toParams(request)
			})
		);
	}
}
