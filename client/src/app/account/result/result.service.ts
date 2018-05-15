import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../../shared/base-http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ResultService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    getResultMenu(filters, boundaries) {
        return this.post(`${this.hostAPI}/front/resultmenu`, { filtersList: filters, boundariesList: boundaries }, this.authorisedOptions())
            .map(res => res.json());
    }

    getResultMenuByQuestionId(questionId) {
        return this.get(`${this.hostAPI}/front/resultmenubyq/${questionId}`, this.authorisedOptions())
            .map(res => res.json());
    }

    getArticles(resultMenuId) {
        return this.get(`${this.hostAPI}/front/resultmenu/${resultMenuId}`, this.authorisedOptions())
            .map(res => res.json());
    }

    saveOperationLog(logData) {
        return this.post(`${this.hostAPI}/log`, logData, this.authorisedOptions())
            .map(res => res.json());
    }

    getMultipleArticles(menuIdList) {
        return this.post(`${this.hostAPI}/front/articlelist`, { list: menuIdList }, this.authorisedOptions())
            .map(res => res.json());
    }
}