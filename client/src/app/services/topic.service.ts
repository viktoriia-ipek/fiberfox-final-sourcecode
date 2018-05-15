import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../shared/base-http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class TopicService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    public getById(id: any): Observable<any> {
        return this.get(this.hostAPI + '/topic/' + id, this.authorisedOptions())
            .map(res => res.json());
    }

    public getList(): Observable<any> {
        return this.get(this.hostAPI + '/topics/', this.authorisedOptions())
            .map(res => res.json());
    }

    public save(newTopic: any): Observable<any> {
        return this.post(this.hostAPI + '/topics/', newTopic, this.authorisedOptions())
            .map(res => res.json());
    }

    public update(id, postData: any): Observable<any> {
        return this.patch(this.hostAPI + '/topic/' + id, postData, this.authorisedOptions())
            .map(res => res.json());
    }

    public remove(id): Observable<any> {
        return this.delete(this.hostAPI + '/topic/' + id, this.authorisedOptions());
    }
}