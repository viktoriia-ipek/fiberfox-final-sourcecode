import { Component, OnInit } from '@angular/core';
import { FilterFrontService } from './filters-front.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data';

@Component({
    moduleId: module.id,
    selector: 'filters',
    templateUrl: 'filters-front.component.html',
    providers: [FilterFrontService]
})
export class FiltersFrontComponent implements OnInit {

    data: any;
    topicId: Number;

    constructor(private dataService: FilterFrontService,
        private sharedData: SharedDataService,
        private route: ActivatedRoute,
        private router: Router) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.topicId = +params['id'];
            this.getData(this.topicId);
        });
    }

    filterToggle(filter) {
        filter.Selected = !filter.Selected;
        let filterGroup = this.data.find(d => d.TargetFilterGroupId === filter.TargetFilterGroupId);
        let selectedFilters = filterGroup.Filters.filter(s => s.Selected === true);
        if (selectedFilters.length == filterGroup.MaxAllowedOptions) {
            let unChecked = filterGroup.Filters.filter(x => !x.Selected);
            if (unChecked && unChecked.length > 0) {
                unChecked.forEach(element => {
                    element.disabled = true;
                });
            }
        } else {
            filterGroup.Filters.forEach(element => {
                element.disabled = false;
            });
        }
    }

    next() {
        console.log(this.data);

        this.setSharedData(this.data);

        if (this.sharedData.data.hasBoundaries()) {
            this.router.navigate(['/account/boundaries', this.topicId]);
        } else {
            this.router.navigate(['/account/result']);
        }
    }

    private getData(topicId): void {
        this.dataService.getFilters(topicId)
            .subscribe(data => {
                if (data && data.Filters && data.Filters.TargetFilterGroup) {
                    this.data = this.convert(data.Filters.TargetFilterGroup);
                }
                console.log(this.data)
            });
    }

    private convert(data) {
        let retValue = data.map(d => {
            let group = d.$;
            group.Filters = d.TargetFilter.map(f => {
                let item = f.$
                item.Selected = false;
                return item;
            });
            return group;
        });
        return retValue;
    }

    private setSharedData(filters) {
        this.sharedData.data.filters = filters;
        this.sharedData.data.boundaries = null;
    }
}
