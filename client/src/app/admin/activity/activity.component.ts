import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
    moduleId: module.id,
    selector: 'activities',
    templateUrl: 'activity.component.html',
    providers: [ActivityService]
})
export class ActivityComponent implements OnInit {

    activities: any;
    displayDialog: boolean = false;
    isNew: boolean;
    activity: any;

    constructor(private activityService: ActivityService) {

    }

    ngOnInit(): void {
        this.getData();
    }

    remove(activityId: Number): void {
        if (!confirm('Are you sure?')) {
            return;
        }

        this.activityService.remove(activityId)
            .subscribe(result => {
                console.log(result);
                this.getData();
            });
    }

    save(): void {
        if (this.isNew) {
            this.activityService.save(this.activity)
                .subscribe(this.saveCallback);
        } else {
            this.activityService.update(this.activity.ActivityId, this.activity)
                .subscribe(this.saveCallback);
        }
        this.displayDialog = false;
    }

    addNew(): void {
        this.displayDialog = true;
        this.isNew = true;
        this.activity = {};
    }

    close(): void {
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.activity = this.cloneActivity(event.data);
        this.displayDialog = true;
    }

    private saveCallback = (result) => {
        this.getData();
    };

    private cloneActivity(c: any): any {
        let activity = {};
        for (let prop in c) {
            activity[prop] = c[prop];
        }
        return activity;
    }

    private getData(): void {
        this.activityService.getList()
            .subscribe(activities => {
                this.activities = activities;
            });
    }
}