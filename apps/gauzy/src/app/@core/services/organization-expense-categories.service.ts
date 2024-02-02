import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
	IOrganizationExpenseCategoryCreateInput,
	IOrganizationExpenseCategory,
	IOrganizationExpenseCategoryFindInput
} from '@gauzy/contracts';
import { API_PREFIX } from '../constants/app.constants';

@Injectable({
	providedIn: 'root'
})
export class OrganizationExpenseCategoriesService {
	constructor(private http: HttpClient) { }

	create(
		createInput: IOrganizationExpenseCategoryCreateInput
	): Promise<IOrganizationExpenseCategory> {
		return firstValueFrom(
			this.http
				.post<IOrganizationExpenseCategory>(
					`${API_PREFIX}/expense-categories`,
					createInput
				)
		);
	}

	getAll(
		findInput?: IOrganizationExpenseCategoryFindInput,
		relations?: string[]
	): Promise<{ items: any[]; total: number }> {
		const data = JSON.stringify({ findInput, relations });

		return firstValueFrom(
			this.http
				.get<{ items: IOrganizationExpenseCategory[]; total: number }>(
					// `${API_PREFIX}/expense-categories`,
					// `https://run.mocky.io/v3/b7016467-499c-4f03-a2bc-fbc8c510e872`,
					`https://run.mocky.io/v3/ac6024ed-1978-41e3-9958-869a3856b953`,
					{
						params: { data }
					}
				)
		);
	}

	update(id: string, updateInput: any): Promise<any> {
		return firstValueFrom(
			this.http
				.put(`${API_PREFIX}/expense-categories/${id}`, updateInput)
		);
	}

	delete(id: string): Promise<any> {
		return firstValueFrom(
			this.http
				.delete(`${API_PREFIX}/expense-categories/${id}`)
		);
	}
}
