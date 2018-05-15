import { Component, OnInit } from '@angular/core';
import { FilterGroupService } from '../../services/filter-group.service';
import { TopicService } from '../../services/topic.service';

@Component({
    moduleId: module.id,
    selector: 'filter-groups',
    templateUrl: 'filter-group.component.html',
    providers: [FilterGroupService, TopicService]
})
export class FilterGroupComponent implements OnInit {

    filterGroups: any;
    displayDialog: boolean = false;
    isNew: boolean;
    filterGroup: any;
    topics: any;

    constructor(private filterGroupService: FilterGroupService,
        private topicService: TopicService) {
    }

    ngOnInit(): void {
        this.getFilterGroups();
        this.getPageData();
    }

    remove(filterGroupId: Number): void {
        if (!confirm('Are you sure?')) {
            return;
        }

        this.filterGroupService.remove(filterGroupId)
            .subscribe(result => { this.getFilterGroups(); });
    }

    save(): void {
        if (this.isNew) {
            this.filterGroupService.save(this.filterGroup)
                .subscribe(this.saveCallback);
        } else {
            this.filterGroupService.update(this.filterGroup.TargetFilterGroupId, this.filterGroup)
                .subscribe(this.saveCallback);
        }
        this.displayDialog = false;
    }

    addNew(): void {
        this.displayDialog = true;
        this.isNew = true;
        this.filterGroup = {};
    }

    close(): void {
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.filterGroup = this.cloneFilterGroup(event.data);
        this.displayDialog = true;
    }

    private saveCallback = (result) => {
        this.getFilterGroups();
    };

    private cloneFilterGroup(c: any): any {
        let filterGroup = {};
        for (let prop in c) {
            filterGroup[prop] = c[prop];
        }
        return filterGroup;
    }

    private getFilterGroups(): void {
        this.filterGroupService.getList()
            .subscribe(filterGroups => { this.filterGroups = filterGroups; });
    }
    private getPageData(): void {
        this.topicService.getList()
            .subscribe(topics => { this.topics = topics; });
    }
}