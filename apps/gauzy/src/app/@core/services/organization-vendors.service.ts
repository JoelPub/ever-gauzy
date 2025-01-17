import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	IOrganizationVendorCreateInput,
	IOrganizationVendor,
	IOrganizationVendorFindInput
} from '@gauzy/contracts';
import { firstValueFrom } from 'rxjs';
import { API_PREFIX } from '../constants/app.constants';

@Injectable({
	providedIn: 'root'
})
export class OrganizationVendorsService {
	constructor(private http: HttpClient) {}

	create(
		createInput: IOrganizationVendorCreateInput
	): Promise<IOrganizationVendor> {
		return firstValueFrom(
			this.http
			.post<IOrganizationVendor>(
				`${API_PREFIX}/organization-vendors`,
				createInput
			)
		);
	}

	getAll(
		findInput?: IOrganizationVendorFindInput,
		relations?: string[],
		order?:{}
	): Promise<{ items: any[]; total: number }> {
		const data = JSON.stringify({ relations, findInput, order });
		return firstValueFrom(
			this.http
			.get<{ items: IOrganizationVendor[]; total: number }>(
				// `${API_PREFIX}/organization-vendors`,
				`https://run.mocky.io/v3/811a968a-0769-48ff-8169-d19fbbe8e6aa`,
				{
					params: { data }
				}
			)
		);
	}

	update(id: string, updateInput: IOrganizationVendorCreateInput): Promise<any> {
		return firstValueFrom(
			this.http
			.put(`${API_PREFIX}/organization-vendors/${id}`, updateInput)
		);
	}

	delete(id: string): Promise<any> {
		return firstValueFrom(
			this.http
			.delete(`${API_PREFIX}/organization-vendors/${id}`)
		);
	}
}
