import { Component, OnInit } from '@angular/core';
import { GridFrontService } from './grid.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data';

@Component({
    moduleId: module.id,
    selector: 'grid',
    templateUrl: 'grid.component.html',
    providers: [GridFrontService]
})
export class GridComponent implements OnInit {

    data: any;
    subCategoryId;

    constructor(private dataService: GridFrontService,
        private sharedData: SharedDataService,
        private route: ActivatedRoute,
        private router: Router) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.subCategoryId = +params['id'];
            if (this.subCategoryId) {
                this.setSharedData(this.subCategoryId);
                this.getData(this.subCategoryId);
            }
        });
    }

    redirectToTopics(phaseId, activityId) {
        this.router.navigate([`/account/topics/${phaseId}/${this.subCategoryId}/${activityId}`]);
    }

    private getData(id): void {
        this.dataService.getTopicsGroups(id)

            .subscribe(data => {
                this.data = data; 
                console.log(this.data);
            });
    }

    private setSharedData(subCategoryId) {
        this.sharedData.data.subCategory = subCategoryId;
        this.sharedData.data.topic = null;
        this.sharedData.data.answer = null;
        this.sharedData.data.filters = null;
        this.sharedData.data.boundaries = null;
    }
}
