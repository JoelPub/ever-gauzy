import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
	IGetEmployeeJobPostInput,
	IEmployeeJobPost,
	IPagination,
	IUpdateEmployeeJobPostAppliedResult,
	IApplyJobPostInput,
	IVisibilityJobPostInput
} from '@gauzy/contracts';
import { toParams } from '@gauzy/common-angular';
import { API_PREFIX } from '../constants/app.constants';

@Injectable({
	providedIn: 'root'
})
export class JobService {
	constructor(private http: HttpClient) {}

	getJobs(request?: IGetEmployeeJobPostInput) {
		return firstValueFrom(
			this.http.get<IPagination<IEmployeeJobPost>>(`${API_PREFIX}/employee-job`, {
				params: request ? toParams(request) : {}
			})
		);
	}

	hideJob(request: IVisibilityJobPostInput) {
		return firstValueFrom(this.http.post<boolean>(`${API_PREFIX}/employee-job/hide`, request));
	}

	applyJob(request: IApplyJobPostInput) {
		return firstValueFrom(
			this.http.post<IUpdateEmployeeJobPostAppliedResult>(`${API_PREFIX}/employee-job/applied`, request)
		);
	}

	/**
	 * Create employee job application record.
	 * We use AI to generate proposal for employee.
	 *
	 * @param request
	 * @returns
	 */
	preProcessEmployeeJobApplication(request: any): Promise<IApplyJobPostInput> {
		return firstValueFrom(this.http.post<any>(`${API_PREFIX}/employee-job/pre-process`, request));
	}

	/**
	 * To generate proposal for specific employee job application
	 *
	 * @param employeeJobApplicationId
	 * @returns
	 */
	generateAIProposal(employeeJobApplicationId: string) {
		return firstValueFrom(
			this.http.post<any>(`${API_PREFIX}/employee-job/generate-proposal/${employeeJobApplicationId}`, {})
		);
	}

	/**
	 * Get employee job application where proposal generated by AI
	 *
	 * @param employeeJobApplicationId
	 * @returns
	 */
	getEmployeeJobApplication(employeeJobApplicationId: string) {
		return this.http.get<any>(`${API_PREFIX}/employee-job/application/${employeeJobApplicationId}`);
	}
}
