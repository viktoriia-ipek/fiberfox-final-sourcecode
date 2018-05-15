import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../shared/base-http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class BoundaryService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    public getById(id: any): Observable<any> {
        return this.get(this.hostAPI + '/boundary/' + id, this.authorisedOptions())
            .map(res => res.json());
    }

    public getList(): Observable<any> {
        return this.get(this.hostAPI + '/boundaries/', this.authorisedOptions())
            .map(res => res.json());
    }

    public save(newCategory: any): Observable<any> {
        return this.post(this.hostAPI + '/boundaries/', newCategory, this.authorisedOptions())
            .map(res => res.json());
    }

    public update(id, postData: any): Observable<any> {
        return this.patch(this.hostAPI + '/boundary/' + id, postData, this.authorisedOptions())
            .map(res => res.json());
    }

    public remove(id): Observable<any> {
        return this.delete(this.hostAPI + '/boundary/' + id, this.authorisedOptions());
    }
}