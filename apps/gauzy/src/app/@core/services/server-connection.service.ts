import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from './store.service';

@Injectable()
export class ServerConnectionService {
	constructor(
		private readonly httpClient: HttpClient,
		private readonly store: Store
	) {}

	async checkServerConnection(endPoint: string) {
		return new Promise((resolve, reject) => {
			// this.httpClient.get(`${endPoint}/api`).subscribe(
			this.httpClient.get(`https://run.mocky.io/v3/5dc472d4-0c5f-4312-a8a5-a4ef6a624123`).subscribe(
				(resp: any) => {
					this.store.serverConnection = resp.status;
					resolve(true);
				},
				(err) => {
					this.store.serverConnection = err.status;
					reject();
				}
			);
		});
	}
}
