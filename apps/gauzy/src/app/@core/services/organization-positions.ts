import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	IOrganizationPositionCreateInput,
	IOrganizationPosition,
	IOrganizationPositionFindInput
} from '@gauzy/contracts';
import { firstValueFrom } from 'rxjs';
import { API_PREFIX } from '../constants/app.constants';

@Injectable({
	providedIn: 'root'
})
export class OrganizationPositionsService {
	constructor(private http: HttpClient) {}

	create(
		createInput: IOrganizationPositionCreateInput
	): Promise<IOrganizationPosition> {
		return firstValueFrom(
			this.http
			.post<IOrganizationPosition>(
				`${API_PREFIX}/organization-positions`,
				createInput
			)
		);
	}

	getAll(
		findInput?: IOrganizationPositionFindInput,
		relations?: string[]
	): Promise<{ items: any[]; total: number }> {
		const data = JSON.stringify({ relations, findInput });

		return firstValueFrom(
			this.http
			.get<{ items: IOrganizationPosition[]; total: number }>(
				// `${API_PREFIX}/organization-positions`,
				`https://run.mocky.io/v3/02965c40-c7f9-4c1a-9c97-6d9ca7272b0c`,
				{
					params: { data }
				}
			)
		);
	}

	update(id: string, updateInput: any): Promise<any> {
		return firstValueFrom(
			this.http
			.put(`${API_PREFIX}/organization-positions/${id}`, updateInput)
		);
	}

	delete(id: string): Promise<any> {
		return firstValueFrom(
			this.http
			.delete(`${API_PREFIX}/organization-positions/${id}`)
		);
	}
}
