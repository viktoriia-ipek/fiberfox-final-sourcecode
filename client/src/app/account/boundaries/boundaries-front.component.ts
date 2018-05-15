import { Component, OnInit } from '@angular/core';
import { BoundaryFrontService } from './boundaries-front.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data';

@Component({
    moduleId: module.id,
    selector: 'front-boundaries',
    templateUrl: 'boundaries-front.component.html',
    providers: [BoundaryFrontService]
})
export class BoundariesFrontComponent implements OnInit {

    data: any;
    topicId: Number;

    constructor(private dataService: BoundaryFrontService,
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
        let boundary = this.data.find(d => d.BoundaryId === filter.BoundaryId);
        let selectedFilters = boundary.Filters.filter(s => s.Selected === true);
        if (selectedFilters.length == boundary.MaxAllowedOptions) {
            let unChecked = boundary.Filters.filter(x => !x.Selected);
            if (unChecked && unChecked.length > 0) {
                unChecked.forEach(element => {
                    element.disabled = true;
                });
            }
        } else {
            boundary.Filters.forEach(element => {
                element.disabled = false;
            });
        }
    }

    next() {
        this.setSharedData(this.data);
        console.log(this.data);
        this.router.navigate(['/account/result']);
    }

    private getData(topicId): void {
        this.dataService.getBoundaries(topicId)
            .subscribe(data => {
                this.data = this.convert(data);
                console.log(this.data)
            });
    }

    private convert(data) {
        let retValue = data.map(d => {
            let group = d.$;
            group.Filters = d.BoundaryOptions.map(f => {
                let item = f.$
                item.Selected = false;
                return item;
            });
            return group;
        });
        return retValue;
    }

    private setSharedData(boundaries) {
        this.sharedData.data.boundaries = boundaries;
    }
}
