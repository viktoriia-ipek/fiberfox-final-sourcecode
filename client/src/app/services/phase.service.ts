import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../shared/base-http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class PhaseService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    public getById(id: any): Observable<any> {
        return this.get(this.hostAPI + '/phase/' + id, this.authorisedOptions())
            .map(res => res.json());
    }

    public getList(): Observable<any> {
        return this.get(this.hostAPI + '/phases/', this.authorisedOptions())
            .map(res => res.json());
    }

    public save(newPhase: any): Observable<any> {
        return this.post(this.hostAPI + '/phases/', newPhase, this.authorisedOptions())
            .map(res => res.json());
    }

    public update(id, postData: any): Observable<any> {
        return this.patch(this.hostAPI + '/phase/' + id, postData, this.authorisedOptions())
            .map(res => res.json());
    }

    public remove(id): Observable<any> {
        return this.delete(this.hostAPI + '/phase/' + id, this.authorisedOptions());
    }
}