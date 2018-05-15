import { Component, Input, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'wizard',
    templateUrl: 'wizard.component.html'
})
export class WizardComponent implements OnInit {

    @Input() selectedStep: string;

    items: any = [
        { id: "category", name: "Category", selected: false, disabled: true },
        { id: "phases", name: "Phases", selected: false, disabled: true },
        { id: "topics", name: "Topics", selected: false, disabled: true },
        { id: "targets", name: "Targets", selected: false, disabled: true },
        { id: "boundary", name: "Boundary Conditions", selected: false, disabled: true },
        { id: "result", name: "Result", selected: false, disabled: true }
    ];

    constructor(private sharedDataService: SharedDataService,
        private router: Router) {
    }

    ngOnInit(): void {
        let selectedItem = this.items.find(x => x.id === this.selectedStep);
        let index = this.items.findIndex(x => x.id === this.selectedStep);
        for (let i = 0; i < index; i++) {
            this.items[i].disabled = false;
        }
        selectedItem.selected = true;
    }

    goToStep(item) {
        if (!this.sharedDataService.data || item.disabled) {
            return;
        }

        switch (item.id) {
            case "category":
                this.router.navigate(['/account/start']);
                break;
            case "phases":
                if (this.sharedDataService.data.subCategory) {
                    this.router.navigate(['/account/grid', this.sharedDataService.data.subCategory]);
                }
                break;
            case "topics":
                if (this.sharedDataService.data.topic) {
                    this.router.navigate(['/account/topics',
                        this.sharedDataService.data.topic.PhaseId,
                        this.sharedDataService.data.subCategory,
                        this.sharedDataService.data.topic.ActivityId]);
                }
                break;
            case "targets":
                if (this.sharedDataService.data.topic) {
                    this.router.navigate(['/account/filters', this.sharedDataService.data.topic.TopicId]);
                }
                break;
            case "boundary":
                if (this.sharedDataService.data.topic) {
                    this.router.navigate(['/account/boundary', this.sharedDataService.data.topic.TopicId]);
                }
                break;
        }
    }
}