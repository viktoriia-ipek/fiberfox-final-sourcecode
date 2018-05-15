import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { ActivityService } from '../../services/activity.service';
import { PhaseService } from '../../services/phase.service';
import { SubCategoryService } from '../../services/sub-category.service';

@Component({
    moduleId: module.id,
    selector: 'topics',
    templateUrl: 'topic.component.html',
    providers: [TopicService, ActivityService, SubCategoryService, PhaseService]
})
export class TopicComponent implements OnInit {

    topics: any;
    displayDialog: boolean = false;
    isNew: boolean;
    topic: any;

    activities: any;
    subCategories: any;
    phases: any;

    constructor(private topicService: TopicService,
        private activityService: ActivityService,
        private subCategoryService: SubCategoryService,
        private phaseService: PhaseService) { }

    ngOnInit(): void {
        this.getTopics();
        this.getPageData();
    }

    remove(topicId: Number): void {
        if (!confirm('Are you sure?'))
            return;

        this.topicService.remove(topicId)
            .subscribe(result => { this.getTopics(); });
    }

    save(): void {
        if (this.isNew) {
            this.topicService.save(this.topic)
                .subscribe(this.saveCallback);
        } else {
            this.topicService.update(this.topic.TopicId, this.topic)
                .subscribe(this.saveCallback);
        }
        this.displayDialog = false;
    }

    addNew(): void {
        this.displayDialog = true;
        this.isNew = true;
        this.topic = {};
    }

    close(): void {
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.topic = this.cloneTopic(event.data);
        this.displayDialog = true;
    }

    private saveCallback = (result) => {
        this.getTopics();
    };

    private cloneTopic(c: any): any {
        let topic = {};
        for (let prop in c) {
            topic[prop] = c[prop];
        }
        return topic;
    }

    private getTopics(): void {
        this.topicService.getList()
            .subscribe(topics => { this.topics = topics; });
    }

    private getPageData(): void {
        this.activityService.getList()
            .subscribe(activities => { this.activities = activities; });
        this.subCategoryService.getList()
            .subscribe(subCategories => { this.subCategories = subCategories; });
        this.phaseService.getList()
            .subscribe(phases => { this.phases = phases; });
    }
}