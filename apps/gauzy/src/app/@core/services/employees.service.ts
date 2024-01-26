import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	IEmployee,
	IEmployeeFindInput,
	IEmployeeCreateInput,
	IEmployeeUpdateInput,
	IEmployeeUpdateProfileStatus,
	IBasePerTenantAndOrganizationEntityModel,
	IDateRangePicker,
	IPagination,
	UpdateEmployeeJobsStatistics
} from '@gauzy/contracts';
import { firstValueFrom, Observable } from 'rxjs';
import { toParams } from '@gauzy/common-angular';
import { API_PREFIX } from '../constants/app.constants';

@Injectable()
export class EmployeesService {
	constructor(
		private readonly http: HttpClient
	) {}

	getAllPublic(
		request: IEmployeeFindInput,
		relations: string[] = []
	): Observable<IPagination<IEmployee>> {
		return this.http.get<IPagination<IEmployee>>(`${API_PREFIX}/public/employee`, {
			params: toParams({ ...request, relations })
		})
	}

	getPublicById(
		slug: string,
		id: string,
		relations: string[] = []
	): Observable<IEmployee> {
		return this.http.get<IEmployee>(`${API_PREFIX}/public/employee/${slug}/${id}`, {
			params: toParams({ relations })
		});
	}

	getAll(
		relations: string[] = [],
		where?: IEmployeeFindInput
	): Observable<{ items: IEmployee[]; total: number }> {
		// return this.http.get<{ items: IEmployee[]; total: number }>( `${API_PREFIX}/employee`, {
		return this.http.get<{ items: IEmployee[]; total: number }>( `https://run.mocky.io/v3/d84c21b1-43f4-4092-95e9-a73a0dfeabf0`, {
			params: toParams({ where, relations })
		});
	}

	getCount(
		request: IEmployeeFindInput
	): Observable<number> {
		// return this.http.get<number>(`${API_PREFIX}/employee/count`, {
		return this.http.get<number>(`https://run.mocky.io/v3/f829e560-f816-4fd8-b167-6d12f177a25e`, {
			params: toParams({ ...request })
		})
	}

	getWorking(
		organizationId: string,
		tenantId: string,
		forRange: IDateRangePicker,
		withUser: boolean
	): Promise<{ items: IEmployee[]; total: number }> {
		const query = {
			organizationId,
			tenantId,
			forRange,
			withUser
		};
		const data = JSON.stringify({ findInput: query });
		return firstValueFrom(
			this.http.get<{ items: IEmployee[]; total: number }>(
				// `${API_PREFIX}/employee/working`,
				`https://run.mocky.io/v3/f855724b-143d-4679-ae93-466e82ac295f`,
				{
					params: { data }
				}
			)
		);
	}

	getWorkingCount(
		organizationId: string,
		tenantId: string,
		forRange: IDateRangePicker,
		withUser: boolean
	): Promise<{ total: number }> {
		const query = {
			organizationId,
			tenantId,
			forRange,
			withUser
		};
		const data = JSON.stringify({ findInput: query });
		return firstValueFrom(
			// this.http.get<{ items: IEmployee[]; total: number }>( `${API_PREFIX}/employee/working/count`, {
			this.http.get<{ items: IEmployee[]; total: number }>( `https://run.mocky.io/v3/7134306a-9942-4374-9e55-907d99f95fe2`, {
				params: { data}
			})
		);
	}

	getEmployeeById(
		id: string,
		relations: string[] = []
	) {
		return this.http.get<IEmployee>(`${API_PREFIX}/employee/${id}`, {
			params: toParams({ relations })
		});
	}

	setEmployeeProfileStatus(id: string, status: IEmployeeUpdateProfileStatus): Promise<IEmployee> {
		return firstValueFrom(
			this.http.put<IEmployee>(`${API_PREFIX}/employee/${id}`, status)
		);
	}

	setEmployeeEndWork(id: string, date: Date, request: IBasePerTenantAndOrganizationEntityModel): Promise<IEmployee> {
		return firstValueFrom(
			this.http.put<IEmployee>(`${API_PREFIX}/employee/${id}`, {
				endWork: date,
				...request
			})
		);
	}

	setEmployeeTimeTrackingStatus(id: string, action: boolean, request: IBasePerTenantAndOrganizationEntityModel): Promise<IEmployee> {
		return firstValueFrom(
			this.http.put<IEmployee>(`${API_PREFIX}/employee/${id}`, {
				isTrackingEnabled: action,
				...request
			})
		);
	}

	update(id: string, updateInput: IEmployeeUpdateInput): Promise<any> {
		return firstValueFrom(
			this.http.put(`${API_PREFIX}/employee/${id}`, updateInput)
		);
	}

	/**
	 * Delete employee
	 *
	 * @param id
	 * @returns
	 */
	delete(
		id: IEmployee['id'],
		options: IBasePerTenantAndOrganizationEntityModel
	) {
		return firstValueFrom(
			this.http.delete(`${API_PREFIX}/employee/${id}`, {
				params: toParams({ ...options })
			})
		);
	}

	/**
	 * Resort deleted employee
	 *
	 * @param id
	 * @returns
	 */
	resort(
		id: IEmployee['id'],
		options: IBasePerTenantAndOrganizationEntityModel
	) {
		return firstValueFrom(
			this.http.put(`${API_PREFIX}/employee/${id}/restore`, options)
		);
	}

	updateProfile(id: string, payload: IEmployeeUpdateInput): Promise<IEmployee> {
		return firstValueFrom(
			this.http.put<IEmployee>(`${API_PREFIX}/employee/${id}/profile`, payload)
		);
	}

	getEmployeeJobsStatistics(request): Promise<any> {
		return firstValueFrom(
			this.http.get(`${API_PREFIX}/employee/job-statistics`, {
				params: toParams(request)
			})
		);
	}

	updateJobSearchStatus(
		id: IEmployee['id'],
		statistics: UpdateEmployeeJobsStatistics
	) {
		return firstValueFrom(
			this.http.put(`${API_PREFIX}/employee/${id}/job-search-status`, statistics)
		);
	}

	create(body: IEmployeeCreateInput): Observable<IEmployee> {
		return this.http.post<IEmployee>(`${API_PREFIX}/employee`, body);
	}

	createBulk(createInput: IEmployeeCreateInput[]): Observable<IEmployee[]> {
		return this.http.post<IEmployee[]>(
			`${API_PREFIX}/employee/bulk`,
			createInput
		);
	}

	setEmployeeStartWork(id: string, date: Date, request: IBasePerTenantAndOrganizationEntityModel): Promise<IEmployee> {
		return firstValueFrom(
			this.http.put<IEmployee>(`${API_PREFIX}/employee/${id}`, {
				startedWorkOn: date,
				...request
			})
		);
	}
}
