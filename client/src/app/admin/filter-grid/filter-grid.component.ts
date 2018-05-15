import { Component, OnInit, Input } from '@angular/core';
import { ResultMenuService } from '../../services/result-menu.service';
import { FilterValueService } from '../../services/filter-value.service';

@Component({
    moduleId: module.id,
    selector: 'filter-grid',
    templateUrl: 'filter-grid.component.html',
    styleUrls: ['filter-grid.component.css'],
    providers: [FilterValueService, ResultMenuService]
})
export class FilterGridComponent implements OnInit {

    data: any;
    @Input() filterGroupId: Number;
    isSavingValues: boolean = false;

    constructor(private resultMenuService: ResultMenuService,
        private filterValueSerice: FilterValueService) {

    }

    ngOnInit(): void {
        this.getFilterValues();
    }

    saveFilterValues(): void {
        this.isSavingValues = true;
        this.filterValueSerice.save({ resultMenu: this.getResultValues(this.data.filterValues) })
            .subscribe(result => {
                this.getFilterValues();
                this.isSavingValues = false;
            });
    }

    refresh() {
        this.getFilterValues();
    }

    private getFilterValues(): void {
        this.filterValueSerice.getList(this.filterGroupId)
            .subscribe(data => {
                this.data = data;
            });
    }

    private getResultValues(filterValues) {
        return [].concat.apply([], this.data.filterValues.map(r => r.resultMenu));
    }
}
