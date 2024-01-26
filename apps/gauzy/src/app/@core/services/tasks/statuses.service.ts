import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITaskStatus } from '@gauzy/contracts';
import { CrudService } from '../crud/crud.service';
import { API_PREFIX } from '../../constants';

@Injectable({
	providedIn: 'root'
})
export class TaskStatusesService extends CrudService<ITaskStatus> {
	// static readonly API_URL = `${API_PREFIX}/task-statuses`;
	static readonly API_URL = `https://run.mocky.io/v3/5902a532-e921-44ae-a713-70648184f095`;

	constructor(protected readonly http: HttpClient) {
		super(http, TaskStatusesService.API_URL);
	}
}
