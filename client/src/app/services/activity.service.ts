import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DefaultService } from './default.service';

@Injectable()
export class ActivityService extends DefaultService {

    constructor(protected http: Http) {
        super(http);
    }

    public getById(id: any): Observable<any> {
        return super.getById(id, 'activity');
    }

    public getList(): Observable<any> {
        return super.getList('activities');
    }

    public save(data: any): Observable<any> {
        return super.save(data, 'activities');
    }

    public update(id, data: any): Observable<any> {
        return super.update(id, data, 'activity');
    }

    public remove(id): Observable<any> {
        return super.remove(id, 'activity');
    }
}