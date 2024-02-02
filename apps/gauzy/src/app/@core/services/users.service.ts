import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IUser, IUserFindInput, IUserUpdateInput } from '@gauzy/contracts';
import { toParams } from '@gauzy/common-angular';
import { API_PREFIX } from '../constants/app.constants';

@Injectable()
export class UsersService {
	constructor(private http: HttpClient) { }

	API_URL = `${API_PREFIX}/user`;

	getMe(relations: string[] = []): Promise<IUser> {
		return firstValueFrom(
			// this.http
			// .get<IUser>(`${this.API_URL}/me`, {
			// 	params: toParams({ relations })
			// })
			relations.length == 0 ? this.http
				.get<IUser>(`https://run.mocky.io/v3/e0707f36-b08e-496a-b42c-87e6ec92eec0`, {
					params: toParams({ relations })
				}) : this.http
					.get<IUser>(`https://run.mocky.io/v3/a9c3cf7d-ad55-462d-9ede-e358ed6f845c`, {
						params: toParams({ relations })
					})
		);
	}

	getUserByEmail(emailId: string): Promise<IUser> {
		return firstValueFrom(
			this.http
				.get<IUser>(`${this.API_URL}/email/${emailId}`)
		);
	}

	getUserById(id: string, relations?: string[]): Promise<IUser> {
		const data = JSON.stringify({ relations });
		return firstValueFrom(
			this.http
				// .get<IUser>(`${this.API_URL}/${id}`, {
				.get<IUser>(`https://run.mocky.io/v3/f6db4c80-9785-4a92-9332-2e112722b968`, {
					params: { data }
				})
		);
	}

	getAll(
		relations?: string[],
		findInput?: IUserFindInput
	): Promise<{ items: IUser[]; total: number }> {
		const data = JSON.stringify({ relations, findInput });
		return firstValueFrom(
			this.http
				.get<{ items: IUser[]; total: number }>(`${this.API_URL}`, {
					params: { data }
				})
		);
	}

	update(userId: string, updateInput: IUserUpdateInput) {
		return firstValueFrom(
			this.http
				.put(`${this.API_URL}/${userId}`, updateInput)
		);
	}

	delete(userId, user) {
		return firstValueFrom(
			this.http
				.delete(`${this.API_URL}/${userId}`, user)
		);
	}

	deleteAllData() {
		return firstValueFrom(
			this.http.delete(`${this.API_URL}/reset`)
		);
	}

	updatePreferredLanguage(input: IUserUpdateInput) {
		return firstValueFrom(
			// this.http.put(`${this.API_URL}/preferred-language`, input)
			// this.http.put(`https://run.mocky.io/v3/29cb4d64-aa6f-4c9f-b894-4c0379cf625a`, input)
			this.http.put(`https://run.mocky.io/v3/504ce31f-6a3b-4860-8d8e-64c6a43d489e`, input)
		);
	}

	updatePreferredComponentLayout(input: IUserUpdateInput) {
		return firstValueFrom(
			this.http.put(`${this.API_URL}/preferred-layout`, input)
		);
	}
}
