import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IAppConfig } from '@gauzy/contracts';
import { API_PREFIX } from '../constants';

@Injectable({ providedIn: 'root' })
export class AppService {

    constructor(
        private readonly _http: HttpClient
    ) { }

    /**
     * Service method to retrieve application configurations.
     *
     * This method makes an HTTP GET request to the '/configs' endpoint and returns an Observable of type IAppSetting.
     *
     * @returns {Observable<IAppSetting>} Observable containing application configurations.
     */
    getAppConfigs(): Observable<IAppConfig> {
		// return this._http.get<IAppConfig>(`${API_PREFIX}/configs`);
		return this._http.get<IAppConfig>(`https://run.mocky.io/v3/28cd1a16-40a2-4966-aa31-de02338bb1bf`);
    }
}
