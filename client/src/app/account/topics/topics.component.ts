import { Component, OnInit } from '@angular/core';
import { TopicsService } from './topics.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { SharedDataService } from '../../services/shared-data';

@Component({
    moduleId: module.id,
    selector: 'topics',
    templateUrl: 'topics.component.html',
    providers: [TopicsService, ActivityService]
})
export class TopicsComponent implements OnInit {

    phaseId: Number;
    subCategoryId: Number;
    activityId: Number;
    data: any;
    activities: any;

    constructor(private dataService: TopicsService,
        private activityService: ActivityService,
        private sharedData: SharedDataService,
        private route: ActivatedRoute,
        private router: Router) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.phaseId = +params['pid'];
            this.subCategoryId = +params['scid'];
            this.activityId = +params['actid'];

            this.getData(this.phaseId, this.subCategoryId, this.activityId);

            this.getActivities();
        });
    }

    selectTopic(topic) {

        this.setSharedData(topic);

        console.log(this.sharedData.data);
        if (topic.HasQuestions) {
            this.router.navigate(['/account/questions', topic.TopicId]);
        } else if (topic.HasTargetFiltering) {
            this.router.navigate(['/account/filters', topic.TopicId]);
        } else if (topic.HasBoundaryOptions) {
            this.router.navigate(['/account/boundaries', topic.TopicId]);
        }
    }

    private getData(phaseId, subCategoryId, activityId): void {
        this.dataService.getTopics(phaseId, subCategoryId, activityId)
            .subscribe(data => { this.data = data; console.log(this.data); });
    }

    private getActivities(): void {
        this.activityService.getList()
            .subscribe(activities => { this.activities = activities; console.log(this.activities); });
    }

    private setSharedData(topic) {
        this.sharedData.data.topic = topic;
        this.sharedData.data.answer = null;
        this.sharedData.data.filters = null;
        this.sharedData.data.boundaries = null;
    }
}
