import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterService } from '../../services/filters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterGridComponent } from '../filter-grid/filter-grid.component';

@Component({
    moduleId: module.id,
    selector: 'filterss',
    templateUrl: 'filters.component.html',
    providers: [FilterService]
})
export class FiltersComponent implements OnInit {

    filters: any;
    displayDialog: boolean = false;
    isNew: boolean;
    filter: any;
    filterGroupId: any;
    @ViewChild("filterGrid") filterGrid: FilterGridComponent;

    constructor(private filterService: FilterService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.filterGroupId = params['id'];
            if (this.filterGroupId) {
                this.isNew = false;
                this.getFilters(this.filterGroupId);
            } else {
                this.isNew = true;
            }
        });
    }

    remove(filterId: Number): void {
        if (!confirm('Are you sure?')) {
            return;
        }

        this.filterService.remove(filterId)
            .subscribe(result => {
                this.getFilters(this.filterGroupId);
                this.filterGrid.refresh();
            });
    }

    save(): void {
        if (this.isNew) {
            this.filter.TargetFilterGroupId = this.filterGroupId;
            this.filterService.save(this.filter)
                .subscribe(this.saveCallback);
        } else {
            this.filterService.update(this.filter.TargetFilterId, this.filter)
                .subscribe(this.saveCallback);
        }
    }

    addNew(): void {
        this.displayDialog = true;
        this.isNew = true;
        this.filter = {};
    }

    close(): void {
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.filter = this.cloneFilterGroup(event.data);
        this.displayDialog = true;
    }

    private saveCallback = (result) => {
        this.getFilters(this.filterGroupId);
        this.displayDialog = false;
        //location.reload();
        this.filterGrid.refresh();
    };

    private cloneFilterGroup(c: any): any {
        let filter = {};
        for (let prop in c) {
            filter[prop] = c[prop];
        }
        return filter;
    }

    private getFilters(id): void {
        this.filterService.getList(id)
            .subscribe(filters => { this.filters = filters; });
    }
}