import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ILanguage } from '@gauzy/contracts';
import { toParams } from '@gauzy/common-angular';
import { API_PREFIX } from '../constants/app.constants';

@Injectable()
export class LanguagesService {
	constructor(private http: HttpClient) { }

	insertLanguage(createLanguage: ILanguage): Promise<ILanguage> {
		return firstValueFrom(
			this.http.post<ILanguage>(`${API_PREFIX}/languages`, createLanguage)
		);
	}

	getAllLanguages(): Promise<{ items: ILanguage[] }> {
		return firstValueFrom(
			// this.http.get<{ items: ILanguage[] }>(`${API_PREFIX}/languages`)
			this.http.get<{ items: ILanguage[] }>(`https://run.mocky.io/v3/5c6834c4-f609-4e3c-9e8c-9cf998d06593`)
		);
	}

	getSystemLanguages(): Promise<{ items: ILanguage[] }> {
		return firstValueFrom(
			// this.http.get<{ items: ILanguage[] }>(`${API_PREFIX}/languages`, {
			this.http.get<{ items: ILanguage[] }>(`https://run.mocky.io/v3/7a6a7ddf-5c41-4528-8292-8c809fd00d0c`, {
				params: toParams({ is_system: 1 })
			})
		);
	}

	delete(id: string): Promise<any> {
		return firstValueFrom(
			this.http.delete(`${API_PREFIX}/languages/${id}`)
		);
	}

	update(id: string, updateInput: ILanguage) {
		return firstValueFrom(
			this.http.put(`${API_PREFIX}/languages/${id}`, updateInput)
		);
	}

	findByName(name: string): Promise<{ item: ILanguage }> {
		return firstValueFrom(
			this.http.get<{ item: ILanguage }>(`${API_PREFIX}/languages/getByName/${name}`)
		);
	}
}
