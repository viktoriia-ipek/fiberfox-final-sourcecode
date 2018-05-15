import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../shared/base-http.service';
import 'rxjs/add/operator/map';
import { SharedData } from '../shared/shared-data.model';

@Injectable()
export class SharedDataService {
    
    data: SharedData = new SharedData();

    constructor() {
    }

    
}