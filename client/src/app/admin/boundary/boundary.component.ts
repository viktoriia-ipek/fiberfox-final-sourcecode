import { Component, OnInit } from '@angular/core';
import { BoundaryService } from '../../services/boundary.service';
import { TopicService } from '../../services/topic.service';

@Component({
    moduleId: module.id,
    selector: 'boundarys',
    templateUrl: 'boundary.component.html',
    providers: [BoundaryService, TopicService]
})
export class BoundaryComponent implements OnInit {

    boundaries: any;
    displayDialog: boolean = false;
    isNew: boolean;
    boundary: any;
    topics: any;

    constructor(private boundaryService: BoundaryService,
        private topicService: TopicService) {
    }

    ngOnInit(): void {
        this.getBoundaries();
        this.getPageData();
    }

    remove(boundaryId: Number): void {
        if (!confirm('Are you sure?')) {
            return;
        }

        this.boundaryService.remove(boundaryId)
            .subscribe(result => { this.getBoundaries(); });
    }

    save(): void {
        if (this.isNew) {
            this.boundaryService.save(this.boundary)
                .subscribe(this.saveCallback);
        } else {
            this.boundaryService.update(this.boundary.BoundaryId, this.boundary)
                .subscribe(this.saveCallback);
        }
        this.displayDialog = false;
    }

    addNew(): void {
        this.displayDialog = true;
        this.isNew = true;
        this.boundary = {};
    }

    close(): void {
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.boundary = this.cloneBoundary(event.data);
        this.displayDialog = true;
    }

    private saveCallback = (result) => {
        this.getBoundaries();
    };

    private cloneBoundary(c: any): any {
        let boundary = {};
        for (let prop in c) {
            boundary[prop] = c[prop];
        }
        return boundary;
    }

    private getBoundaries(): void {
        this.boundaryService.getList()
            .subscribe(boundaries => { this.boundaries = boundaries; });
    }
    private getPageData(): void {
        this.topicService.getList()
            .subscribe(topics => { this.topics = topics; });
    }
}