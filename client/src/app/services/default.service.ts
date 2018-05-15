import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../shared/base-http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class DefaultService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    public getById(id: any, path: String): Observable<any> {
        return this.get(`${this.hostAPI}/${path}/${id}`, this.authorisedOptions())
            .map(res => res.json());
    }

    public getList(path: String): Observable<any> {
        return this.get(`${this.hostAPI}/${path}`, this.authorisedOptions())
            .map(res => res.json());
    }

    public save(data: any, path: String): Observable<any> {
        return this.post(`${this.hostAPI}/${path}`, data, this.authorisedOptions())
            .map(res => res.json());
    }

    public update(id, data: any, path: String): Observable<any> {
        return this.patch(`${this.hostAPI}/${path}/${id}`, data, this.authorisedOptions())
            .map(res => res.json());
    }

    public remove(id, path: String): Observable<any> {
        return this.delete(`${this.hostAPI}/${path}/${id}`, this.authorisedOptions());
    }
}