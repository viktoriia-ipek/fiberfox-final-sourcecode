import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../../shared/base-http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoriesFrontService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    public getCategories(): Observable<any> {
        return this.get(`${this.hostAPI}/front/categories`, this.authorisedOptions())
            .map(this.convertData);
    }

    private convertData(res) {
        let response = res.json();
        let retValue = [];
        let categoryId = -1;
        let el = {
            categoryId: -1,
            categoryName: "",
            subCategories: []
        };
        response.forEach((element, i) => {

            if (categoryId != element.CategoryId) {
                el = {
                    categoryId: element.CategoryId,
                    categoryName: element.Name,
                    subCategories: []
                };
                retValue.push(el);
            }
            el.subCategories.push({
                subCategoryId: element.SubCategoryId,
                subCategoryName: element.SubCategoryName,
                isActive: element.IsActive
            });
            categoryId = element.CategoryId;
        });
        return retValue;
    }
}