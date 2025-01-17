import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	IFeature,
	IFeatureOrganization,
	IFeatureOrganizationUpdateInput,
	IFeatureOrganizationFindInput,
	IPagination
} from '@gauzy/contracts';
import { toParams } from '@gauzy/common-angular';
import { firstValueFrom, Observable } from 'rxjs';
import { API_PREFIX } from '../../constants/app.constants';

@Injectable()
export class FeatureService {
	API_URL = `${API_PREFIX}/feature/toggle`;

	constructor(private http: HttpClient) {}

	getFeatureToggleDefinition() {
		return firstValueFrom(
			// this.http.get(`${this.API_URL}/definition`)
			this.http.get(`https://run.mocky.io/v3/f7984823-a1d2-40f1-8385-46b70b44cbda`)
		);
	}

	getParentFeatures(
		relations?: string[]
	): Observable<IPagination<IFeature>> {
		return this.http.get<IPagination<IFeature>>(
			`${this.API_URL}/parent`,
			{
				params: toParams({ relations })
			}
		);
	}

	getAllFeatures(): Observable<IPagination<IFeature>> {
		return this.http.get<IPagination<IFeature>>(
			`${this.API_URL}`
		);
	}

	getFeatureOrganizations(
		where?: IFeatureOrganizationFindInput,
		relations?: string[]
	): Observable<IPagination<IFeatureOrganization>> {
		return this.http.get<IPagination<IFeatureOrganization>>(
			`${this.API_URL}/organizations`,
			{
				params: toParams({ relations, ...where })
			}
		);
	}

	featureToggle(payload: IFeatureOrganizationUpdateInput) {
		return this.http.post(`${this.API_URL}`, payload);
	}
}
