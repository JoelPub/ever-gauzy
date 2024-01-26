import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IPagination, ITag, ITagFindInput } from '@gauzy/contracts';
import { toParams } from '@gauzy/common-angular';
import { API_PREFIX } from '../constants/app.constants';
import { CrudService } from './crud/crud.service';

@Injectable()
export class TagsService extends CrudService<ITag> {

	static readonly API_URL = `${API_PREFIX}/tags`;

	constructor(
		protected readonly http: HttpClient
	) {
		super(http, TagsService.API_URL);
	}

	/**
	 * Get tags
	 *
	 * @param relations
	 * @param findInput
	 * @returns
	 */
	getTags(
		where: ITagFindInput,
		relations: string[] = [],
	): Promise<IPagination<ITag>> {
		return firstValueFrom(
			// this.http.get<IPagination<ITag>>(`${API_PREFIX}/tags`, {
			this.http.get<IPagination<ITag>>(`https://run.mocky.io/v3/0ed9fe43-5460-4226-983b-360a2a6211be`, {
				params: toParams({ where, relations })
			})
		);
	}

	/**
	 * Get tags by level
	 *
	 * @param where
	 * @param relations
	 * @returns
	 */
	getTagsByLevel(
		where: ITagFindInput,
		relations: string[] = []
	): Promise<IPagination<ITag>> {
		return firstValueFrom(
			// this.http.get<IPagination<ITag>>(`${API_PREFIX}/tags/level`, {
			this.http.get<IPagination<ITag>>(`https://run.mocky.io/v3/e2c30396-1787-41f7-ac9d-32cf603507ac`, {
				params: toParams({ ...where, relations })
			})
		);
	}
}
