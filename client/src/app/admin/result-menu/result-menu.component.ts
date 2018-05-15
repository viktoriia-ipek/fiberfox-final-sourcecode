import { Component, OnInit } from '@angular/core';
import { ResultMenuService } from '../../services/result-menu.service';
import { TopicService } from '../../services/topic.service';

@Component({
    moduleId: module.id,
    selector: 'result-menu',
    templateUrl: 'result-menu.component.html',
    providers: [ResultMenuService, TopicService]
})
export class ResultMenuComponent implements OnInit {

    resultMenuItems: any;
    displayDialog: boolean = false;
    isNew: boolean;
    menu: any;
    topics: any;

    constructor(private resultMenuService: ResultMenuService,
        private topicService: TopicService) {

    }

    ngOnInit(): void {
        this.getData();
        this.getTopics();
    }

    remove(menuId: Number): void {
        if (!confirm('Are you sure?')) {
            return;
        }

        this.resultMenuService.remove(menuId)
            .subscribe(result => { this.getData(); });
    }

    save(): void {
        if (this.isNew) {
            this.resultMenuService.save(this.menu)
                .subscribe(this.saveCallback);
        } else {
            this.resultMenuService.update(this.menu.ResultMenuId, this.menu)
                .subscribe(this.saveCallback);
        }
        this.displayDialog = false;
    }

    addNew(): void {
        this.displayDialog = true;
        this.isNew = true;
        this.menu = {};
    }

    close(): void {
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.menu = this.cloneMenu(event.data);
        this.displayDialog = true;
    }

    private saveCallback = (result) => {
        this.getData();
    };

    private cloneMenu(c: any): any {
        let menu = {};
        for (let prop in c) {
            menu[prop] = c[prop];
        }
        return menu;
    }

    private getData(): void {
        this.resultMenuService.getList()
            .subscribe(items => {
                this.resultMenuItems = items;
            });
    }
    private getTopics(): void {
        this.topicService.getList()
            .subscribe(topics => { this.topics = topics; });
    }
}