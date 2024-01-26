import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	IUserOrganization,
	IUserOrganizationCreateInput,
	IUserOrganizationFindInput
} from '@gauzy/contracts';
import { firstValueFrom, Observable } from 'rxjs';
import { API_PREFIX } from '../constants/app.constants';

@Injectable()
export class UsersOrganizationsService {
	constructor(private http: HttpClient) {}

	getAll(
		relations?: string[],
		findInput?: IUserOrganizationFindInput
	): Promise<{ items: IUserOrganization[]; total: number }> {
		const data = JSON.stringify({ relations, findInput });
		return firstValueFrom(
			// this.http
			// .get<{ items: IUserOrganization[]; total: number }>(
			// 	`${API_PREFIX}/user-organization`,
			// 	{
			// 		params: { data }
			// 	}
			// )
			relations.length==0?
				this.http
					.get<{ items: IUserOrganization[]; total: number }>(
						`https://run.mocky.io/v3/d3ef910b-adca-4ecf-b531-fce63ab30e66`,
						{
							params: { data }
						}
					)
				:
				this.http
					.get<{ items: IUserOrganization[]; total: number }>(
						`https://run.mocky.io/v3/49752093-85a6-4b3f-8eee-eeee553c02db`,
						{
							params: { data }
						}
					)
		);
	}

	setUserAsInactive(id: string): Promise<IUserOrganization> {
		return firstValueFrom(
			this.http
			.put<IUserOrganization>(`${API_PREFIX}/user-organization/${id}`, {
				isActive: false
			})
		);
	}

	getUserOrganizationCount(id: string): Promise<number> {
		return firstValueFrom(
			this.http
			.get<number>(`${API_PREFIX}/user-organization/${id}`)
		);
	}

	removeUserFromOrg(id: string): Promise<IUserOrganization> {
		return firstValueFrom(
			this.http
			.delete<IUserOrganization>(`${API_PREFIX}/user-organization/${id}`)
		);
	}

	create(
		createInput: IUserOrganizationCreateInput
	): Observable<IUserOrganization> {
		return this.http.post<IUserOrganization>(
			`${API_PREFIX}/user-organization`,
			createInput
		);
	}
}
