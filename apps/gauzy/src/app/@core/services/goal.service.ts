import { Injectable } from '@angular/core';
import { IGoal, IGoalFindInput, IGoalResponse } from '@gauzy/contracts';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from './toastr.service';
import { API_PREFIX } from '../constants/app.constants';

@Injectable({
	providedIn: 'root'
})
export class GoalService {
	// private readonly API_URL = `${API_PREFIX}/goals`;
	private readonly API_URL = `https://run.mocky.io/v3/74a18224-a65d-4c8c-837f-6c24f874bc0e`;

	constructor(
		private readonly _http: HttpClient,
		private readonly toastrService: ToastrService
	) {}

	createGoal(goal): Promise<IGoal> {
		return firstValueFrom(
			this._http.post<IGoal>(`${this.API_URL}`, goal)
			.pipe(
				catchError(
					(error) => this.errorHandler(error)
				)
			)
		);
	}

	update(id: string, goal: IGoal): Promise<IGoal> {
		return firstValueFrom(
			this._http
			.put<IGoal>(`${this.API_URL}/${id}`, goal)
		);
	}

	getAllGoals(
		relations?: string[],
		findInput?: IGoalFindInput
	): Promise<IGoalResponse> {
		const data = JSON.stringify({ relations, findInput });
		return firstValueFrom(
			this._http.get<IGoalResponse>(`${this.API_URL}`, {
				params: { data }
			})
			.pipe(
				catchError(
					(error) => this.errorHandler(error)
				)
			)
		);
	}

	delete(id: string): Promise<any> {
		return firstValueFrom(
			this._http
			.delete(`${this.API_URL}/${id}`)
		);
	}

	errorHandler(error: HttpErrorResponse) {
		this.toastrService.danger(error.message, 'Error');
		return throwError(error.message);
	}
}
