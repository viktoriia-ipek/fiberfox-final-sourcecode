import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../shared/base-http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    public getUserById(userId: number): Observable<any> {
        return this.get(this.hostAPI + '/user/' + userId, this.authorisedOptions())
            .map(res => res.json());
    }

    public getUsers(): Observable<any> {
        return this.get(this.hostAPI + '/users/', this.authorisedOptions())
            .map(res => res.json());
    }

    public changeApproval(userId: number, isApproved: number): Observable<any> {
        return this.post(this.hostAPI + '/approval/' + userId, { "IsApproved": isApproved }, this.authorisedOptions())
            .map(res => res.json());
    }

    public remove(userId: number): Observable<any> {
        return this.delete(this.hostAPI + '/user/' + userId, this.authorisedOptions());
    }
}