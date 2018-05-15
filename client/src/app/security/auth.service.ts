import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../shared/base-http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    getLoggedInUser() {
        return JSON.parse(localStorage.getItem('currentUser') || "{}");
    }

    login(email: string, password: string) {
        return this.http.post(this.hostAPI + '/authenticate'
            , JSON.stringify({ email: email, password: password })
            , this.options())
            .map((response: Response) => {
                // login successful if there's a token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    createUser(newUser: any): Observable<any> {
        return this.post(this.hostAPI + '/account/', newUser // TODO Do we need RequestOptions?
            , new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) }))
            .map(res => res.json());
    }
}