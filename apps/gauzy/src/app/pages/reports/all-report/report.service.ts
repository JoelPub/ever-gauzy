import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	GetReportMenuItemsInput,
	IGetReport,
	IGetReportCategory,
	IPagination,
	IReport,
	UpdateReportMenuInput
} from '@gauzy/contracts';
import { toParams } from '@gauzy/common-angular';
import { Query, Store, StoreConfig } from '@datorama/akita';
import { API_PREFIX } from '../../../@core/constants/app.constants';
import { firstValueFrom } from 'rxjs';

export function initialReportFilterState(): IReport[] {
	return [];
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'report-category', resettable: true })
export class ReportFilterStore extends Store<IReport[]> {
	constructor() {
		super(initialReportFilterState());
	}
}

@Injectable({ providedIn: 'root' })
export class ReportFilterQuery extends Query<IReport[]> {
	constructor(protected store: ReportFilterStore) {
		super(store);
	}
}
@Injectable({
	providedIn: 'root'
})
export class ReportService {
	menuItems$ = this.reportQuery.select((state) => state);

	public get menuItems(): IReport[] {
		return this.reportQuery.getValue();
	}
	public set menuItems(value: IReport[]) {
		this.reportStore.reset();
		this.reportStore.update(value);
	}

	constructor(
		private http: HttpClient,
		protected reportStore: ReportFilterStore,
		protected reportQuery: ReportFilterQuery
	) { }

	getReportMenuItems(request: GetReportMenuItemsInput = {}) {
		return firstValueFrom(
			this.http
				// .get<IReport[]>(`${API_PREFIX}/report/menu-items`, {
				// .get<IReport[]>(`https://run.mocky.io/v3/881d5f24-d409-42f7-b20d-a9e1897dfb52`, {
				// .get<IReport[]>(`https://run.mocky.io/v3/e3e287a9-4a00-403f-8c84-ef25bbb7df3b`, {
				.get<IReport[]>(`https://run.mocky.io/v3/49e19dd0-1143-4cb8-ac3b-bcc1d643886f`, {
					params: request ? toParams(request) : {}
				})
		).then((resp) => {
			this.menuItems = resp;
			return resp;
		});
	}

	getReports(request?: IGetReport) {
		return firstValueFrom(
			this.http
				// .get<IPagination<IReport>>(`${API_PREFIX}/report`, {
				.get<IPagination<IReport>>(`https://run.mocky.io/v3/abdcd7db-3195-4c7d-be8c-d369a5429ad5`, {
					params: request ? toParams(request) : {}
				})
		);
	}

	updateReport(request?: UpdateReportMenuInput) {
		return firstValueFrom(
			this.http
				.post<IPagination<IReport>>(
					`${API_PREFIX}/report/menu-item`,
					request
				)
		);
	}

	getReportCategories(request?: IGetReportCategory) {
		return firstValueFrom(
			this.http
				.get<IPagination<IReport>>(`${API_PREFIX}/report/category`, {
					params: request ? toParams(request) : {}
				})
		);
	}
}
