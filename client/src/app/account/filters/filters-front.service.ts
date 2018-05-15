import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../../shared/base-http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class FilterFrontService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    public getFilters(topicId): Observable<any> {
        return this.get(`${this.hostAPI}/front/filters/${topicId}`, this.authorisedOptions())
            .map(res => res.json());
    }
}