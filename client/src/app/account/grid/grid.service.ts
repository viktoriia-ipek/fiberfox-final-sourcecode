import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../../shared/base-http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class GridFrontService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    public getTopicsGroups(id): Observable<any> {
        return this.get(`${this.hostAPI}/front/topicgroups/${id}`, this.authorisedOptions())
            .map(this.convertData);
    }

    private convertData(res) {
        let response = res.json();
        let grouppedByActivity = response.map(q => q.ActivityId);
        grouppedByActivity = grouppedByActivity.filter(function (item, pos) {
            return grouppedByActivity.indexOf(item) == pos;
        });
        let retValue = {
            phases: response.filter(r => r.ActivityId == response[0].ActivityId)
                .map(r => {
                    return {
                        phaseName: r.PhaseName,
                        phaseId: r.PhaseId,
                        phaseDescription: r.PhaseDescription
                    }
                }),
            topicGroups: grouppedByActivity
                .map(r => {
                    let topic = response.filter(w => w.ActivityId == r);
                    return {
                        activityName: topic[0].ActivityName,
                        activityId: topic[0].ActivityId,
                        phaseId: topic[0].PhaseId,
                        topics: topic.map(x => {
                            return {
                                topicsCount: x.Topics,
                                phaseId: x.PhaseId,
                                phaseName: x.PhaseName
                            }
                        })
                    }
                })
        };
        return retValue;
    }
}