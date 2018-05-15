import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DefaultService } from './default.service';
import 'rxjs/add/operator/map';
import { QuestionModel } from '../admin/question/edit/question-model';

@Injectable()
export class QuestionService extends DefaultService {

    constructor(protected http: Http) {
        super(http);
    }

    public getById(id: any): Observable<QuestionModel> {
        return this.get(`${this.hostAPI}/question/${id}`, this.authorisedOptions())
            .map(res => {
                let response = res.json();
                let result = Array.isArray(response) ? response[0] : response;
                let question = new QuestionModel();
                question.QuestionId = result.QuestionId;
                question.QuestionText = result.QuestionText;
                question.TopicId = result.TopicId;
                question.HasTargetFiltering = result.HasTargetFiltering;
                question.HasBoundaryOptions = result.HasBoundaryOptions;
                question.ResultMenuItems = [];
                if (Array.isArray(response)) {
                    response.forEach(element => {
                        if (element && element.ResultMenuId && element.ResultMenuName) {
                            let resultMenuItem = {
                                "ResultMenuId": element.ResultMenuId,
                                "Name": element.ResultMenuName
                            };
                            question.ResultMenuItems.push(resultMenuItem);
                        }
                    });
                }
                return question;
            });
    }

    public getList(): Observable<any> {
        return super.getList('questions');
    }

    public save(data: any): Observable<any> {
        return super.save(data, 'questions');
    }

    public update(id, data: any): Observable<any> {
        return super.update(id, data, 'question');
    }

    public remove(id): Observable<any> {
        return super.remove(id, 'question');
    }
}