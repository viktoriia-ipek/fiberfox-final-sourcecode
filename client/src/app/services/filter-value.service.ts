import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DefaultService } from './default.service';

@Injectable()
export class FilterValueService extends DefaultService {

    constructor(protected http: Http) {
        super(http);
    }

    public getById(id: any): Observable<any> {
        return super.getById(id, 'resultmenu');
    }

    public getList(id): Observable<any> {
        return this.get(`${this.hostAPI}/filtervalues/${id}`, this.authorisedOptions())
            .map(this.convertData);
    }

    public save(data: any): Observable<any> {
        return super.save(data, 'filtervalue');
    }

    public update(id, data: any): Observable<any> {
        return super.update(id, data, 'resultmenu');
    }

    public remove(id): Observable<any> {
        return super.remove(id, 'resultmenu');
    }

    private convertData(res) {
        let response = res.json();
        let retValue = {
            resultMenu: [],
            filterValues: []
        };
        if (!response || !response.length || response.length === 0) {
            return retValue;
        }
        let targetFilterId = response[0].TargetFilterId;
        let targetFilterId2 = -1;
        let fv = { filterText: "", resultMenu: [] };
        response.forEach((element, i) => {
            if (targetFilterId == element.TargetFilterId) {
                retValue.resultMenu.push({ ResultMenuName: element.ResultMenuName, ResultMenuId: element.ResultMenuId });
                targetFilterId = element.TargetFilterId;
            }

            if (targetFilterId2 == element.TargetFilterId && i < response.length) {
                fv.resultMenu.push({
                    TargetFilterValueId: element.TargetFilterValueId,
                    AlgorithmValue: element.AlgorithmValue,
                    ResultMenuId: element.ResultMenuId,
                    TargetFilterId: element.TargetFilterId
                });
            } else {
                fv = { filterText: element.FilterText, resultMenu: [] };
                fv.resultMenu.push({
                    TargetFilterValueId: element.TargetFilterValueId,
                    AlgorithmValue: element.AlgorithmValue,
                    ResultMenuId: element.ResultMenuId,
                    TargetFilterId: element.TargetFilterId
                });
                retValue.filterValues.push(fv);
            }
            targetFilterId2 = element.TargetFilterId;
        });
        return retValue;
    }
}