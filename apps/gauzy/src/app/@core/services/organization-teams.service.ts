import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
	IOrganizationTeam,
	IOrganizationTeamFindInput,
	IOrganizationTeamCreateInput,
	IPagination,
	IOrganizationTeamUpdateInput,
	IBasePerTenantAndOrganizationEntityModel
} from '@gauzy/contracts';
import { toParams } from '@gauzy/common-angular';
import { API_PREFIX } from '../constants/app.constants';

@Injectable({
	providedIn: 'root'
})
export class OrganizationTeamsService {

	constructor(
		private readonly http: HttpClient
	) { }

	// TODO: Implement logic to proceed the following requests:
	// 1) Get all employees of selected Organization and put in in the select as options;
	// 2) Create a team with name and members (employees involved);
	// 3) Edit team- similar with create;
	// 4) Delete a team
	// 5) Display all teams: show team name and members - avatar + full name for each member;

	create(body: IOrganizationTeamCreateInput): Promise<IOrganizationTeam> {
		return firstValueFrom(
			this.http.post<IOrganizationTeam>(`${API_PREFIX}/organization-team`, body)
		);
	}

	getAll(
		relations: string[] = [],
		where?: IOrganizationTeamFindInput
	): Promise<IPagination<IOrganizationTeam>> {
		return firstValueFrom(
			// this.http.get<IPagination<IOrganizationTeam>>(`${API_PREFIX}/organization-team`, {
			// this.http.get<IPagination<IOrganizationTeam>>(`https://run.mocky.io/v3/bc51754d-80f5-4375-b93d-32548ac9128c`, {
			this.http.get<IPagination<IOrganizationTeam>>(`https://run.mocky.io/v3/b903481b-1f6e-439d-8968-1cf5247db60b`, {
				params: toParams({ where, relations })
			})
		);
	}

	update(
		id: IOrganizationTeam['id'],
		body: IOrganizationTeamUpdateInput
	): Promise<any> {
		return firstValueFrom(
			this.http.put(`${API_PREFIX}/organization-team/${id}`, body)
		);
	}

	delete(
		id: IOrganizationTeam['id'],
		params: IBasePerTenantAndOrganizationEntityModel
	): Promise<IOrganizationTeam | HttpErrorResponse> {
		return firstValueFrom(
			this.http.delete<IOrganizationTeam>(`${API_PREFIX}/organization-team/${id}`, {
				params: toParams(params)
			})
		);
	}

	getCount(
		request: IOrganizationTeamFindInput
	): Promise<number> {
		return firstValueFrom(
			// this.http.get<number>(`${API_PREFIX}/organization-team/count`, {
			this.http.get<number>(`https://run.mocky.io/v3/46dcb95c-213e-44c8-a48d-36eb470c9fa2`, {
				params: toParams({ ...request })
			})
		);
	}

	getMyTeams(
		where?: IOrganizationTeamFindInput,
		relations: string[] = [],
	): Promise<IPagination<IOrganizationTeam>> {
		return firstValueFrom(
			// this.http.get<IPagination<IOrganizationTeam>>(`${API_PREFIX}/organization-team/me`, {
			this.http.get<IPagination<IOrganizationTeam>>(`https://run.mocky.io/v3/906cc418-ae88-4d63-b3ce-3b33019598fd`, {
				params: toParams({ where, relations })
			})
		);
	}

	getAllByEmployee(
		id: IOrganizationTeam['id'],
		where?: IOrganizationTeamFindInput
	): Promise<IOrganizationTeam[]> {
		return firstValueFrom(
			this.http.get<IOrganizationTeam[]>(`${API_PREFIX}/organization-team/employee/${id}`, {
				params: toParams({ ...where })
			})
		);
	}
}
