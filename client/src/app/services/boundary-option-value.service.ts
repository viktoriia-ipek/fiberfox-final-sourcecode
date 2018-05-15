import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DefaultService } from './default.service';

@Injectable()
export class BoundaryOptionValueService extends DefaultService {

    constructor(protected http: Http) {
        super(http);
    }

    public getById(id: any): Observable<any> {
        return super.getById(id, 'resultmenu');
    }

    public getList(id): Observable<any> {
        return this.get(`${this.hostAPI}/boundaryvalues/${id}`, this.authorisedOptions())
            .map(this.convertData);
    }

    public save(data: any): Observable<any> {
        return super.save(data, 'boundaryvalue');
    }

    private convertData(res) {
        let response = res.json();
        let retValue = {
            resultMenu: [],
            boundaryOptionValues: []
        };
        if (!response || !response.length || response.length === 0) {
            return retValue;
        }
        let boundaryOptionId = response[0].BoundaryOptionId;
        let boundaryOptionId2 = -1;
        let fv = { boundaryText: "", resultMenu: [] };
        response.forEach((element, i) => {
            if (boundaryOptionId == element.BoundaryOptionId) {
                retValue.resultMenu.push({ ResultMenuName: element.ResultMenuName, ResultMenuId: element.ResultMenuId });
                boundaryOptionId = element.BoundaryOptionId;
            }

            if (boundaryOptionId2 == element.BoundaryOptionId && i < response.length) { // TODO review
                fv.resultMenu.push({
                    BoundaryOptionValueId: element.BoundaryOptionValueId,
                    AlgorithmValue: element.AlgorithmValue,
                    ResultMenuId: element.ResultMenuId,
                    BoundaryOptionId: element.BoundaryOptionId
                });
            } else {
                fv = { boundaryText: element.BoundaryText, resultMenu: [] };
                fv.resultMenu.push({
                    BoundaryOptionValueId: element.BoundaryOptionValueId,
                    AlgorithmValue: element.AlgorithmValue,
                    ResultMenuId: element.ResultMenuId,
                    BoundaryOptionId: element.BoundaryOptionId
                });
                retValue.boundaryOptionValues.push(fv);
            }
            boundaryOptionId2 = element.BoundaryOptionId;
        });
        return retValue;
    }
}