import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../../shared/base-http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class TopicsService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    public getTopics(phaseId, subCategoryId, activityId): Observable<any> {
        return this.get(`${this.hostAPI}/front/topics/${phaseId}/${subCategoryId}/${activityId}`, this.authorisedOptions())
            .map(res => res.json());
    }
}