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
	constructor(private http: HttpClient) { }

	getCounts(request: IGetCountsStatistics) {
		return firstValueFrom(
			this.http.get<ICountsStatistics>(
				// `${API_PREFIX}/timesheet/statistics/counts`,
				// `https://run.mocky.io/v3/79b8a3eb-fa58-47db-9312-8ae39b0c093a`,
				`https://run.mocky.io/v3/33fe984e-d90e-4b2c-a696-f30b8c7298e9`,
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
				// `https://run.mocky.io/v3/6d135b4e-71a4-41c5-8004-f317a15489ab`,
				`https://run.mocky.io/v3/05cee1e9-1897-4513-aa82-672b747765bb`,
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
				// `https://run.mocky.io/v3/6d135b4e-71a4-41c5-8004-f317a15489ab`,
				`https://run.mocky.io/v3/4cf1c569-10b5-4a92-a664-aabbf0cc2b11`,
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
				// `https://run.mocky.io/v3/6d135b4e-71a4-41c5-8004-f317a15489ab`,
				`https://run.mocky.io/v3/3bc30928-5d92-44dc-b1fb-70a2da697a98`,
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
				// `https://run.mocky.io/v3/6d135b4e-71a4-41c5-8004-f317a15489ab`,
				`https://run.mocky.io/v3/01867c6f-b596-463d-920d-2a0aa22aec6e`,
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
				// `https://run.mocky.io/v3/6d135b4e-71a4-41c5-8004-f317a15489ab`,
				`https://run.mocky.io/v3/50040fef-9e56-4f5c-83d4-0e42b998691e`,
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
				// `https://run.mocky.io/v3/6d135b4e-71a4-41c5-8004-f317a15489ab`,
				`https://run.mocky.io/v3/61f07888-f85c-43fe-89ae-c921afab8fde`,
				{
					params: toParams(request)
				}
			)
		);
	}
}
