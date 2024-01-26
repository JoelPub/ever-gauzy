import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
	IGetTimeSlotStatistics,
	IGetActivitiesStatistics,
	IGetProjectsStatistics,
	IGetMembersStatistics,
	IGetTasksStatistics,
	IGetCountsStatistics,
	ICountsStatistics,
	IMembersStatistics,
	IActivitiesStatistics,
	ITimeSlotStatistics,
	IProjectsStatistics,
	ITasksStatistics,
	IManualTimesStatistics
} from '@gauzy/contracts';
import { toParams } from '@gauzy/common-angular';
import { API_PREFIX } from '../../@core/constants/app.constants';

@Injectable({
	providedIn: 'root'
})
export class TimesheetStatisticsService {
	constructor(private http: HttpClient) {}

	getCounts(request: IGetCountsStatistics) {
		return firstValueFrom(
			this.http.get<ICountsStatistics>(
				// `${API_PREFIX}/timesheet/statistics/counts`,
				`https://run.mocky.io/v3/79b8a3eb-fa58-47db-9312-8ae39b0c093a`,
				{
					params: toParams(request)
				}
			)
		);
	}

	getTimeSlots(request?: IGetTimeSlotStatistics) {
		return firstValueFrom(
			this.http.get<ITimeSlotStatistics[]>(
				// `${API_PREFIX}/timesheet/statistics/time-slots`,
				`https://run.mocky.io/v3/6d135b4e-71a4-41c5-8004-f317a15489ab`,
				{
					params: toParams(request)
				}
			)
		);
	}

	getActivities(request?: IGetActivitiesStatistics) {
		return firstValueFrom(
			this.http.get<IActivitiesStatistics[]>(
				// `${API_PREFIX}/timesheet/statistics/activities`,
				`https://run.mocky.io/v3/6d135b4e-71a4-41c5-8004-f317a15489ab`,
				{
					params: toParams(request)
				}
			)
		);
	}

	getTasks(request: IGetTasksStatistics) {
		return firstValueFrom(
			this.http.get<ITasksStatistics[]>(
				// `${API_PREFIX}/timesheet/statistics/tasks`,
				`https://run.mocky.io/v3/6d135b4e-71a4-41c5-8004-f317a15489ab`,
				{
					params: toParams(request)
				}
			)
		);
	}

	getManualTimes(request: any) {
		return firstValueFrom(
			this.http.get<IManualTimesStatistics[]>(
				// `${API_PREFIX}/timesheet/statistics/manual-times`,
				`https://run.mocky.io/v3/6d135b4e-71a4-41c5-8004-f317a15489ab`,
				{
					params: toParams(request)
				}
			)
		);
	}

	getProjects(request?: IGetProjectsStatistics) {
		return firstValueFrom(
			this.http.get<IProjectsStatistics[]>(
				// `${API_PREFIX}/timesheet/statistics/projects`,
				`https://run.mocky.io/v3/6d135b4e-71a4-41c5-8004-f317a15489ab`,
				{
					params: toParams(request)
				}
			)
		);
	}

	getMembers(request: IGetMembersStatistics) {
		return firstValueFrom(
			this.http.get<IMembersStatistics[]>(
				// `${API_PREFIX}/timesheet/statistics/members`,
				`https://run.mocky.io/v3/6d135b4e-71a4-41c5-8004-f317a15489ab`,
				{
					params: toParams(request)
				}
			)
		);
	}
}
