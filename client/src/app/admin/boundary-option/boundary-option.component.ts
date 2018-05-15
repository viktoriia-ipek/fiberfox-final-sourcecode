import { Component, OnInit, ViewChild } from '@angular/core';
import { BoundaryOptionService } from '../../services/boundary-option.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BoundaryOptionGridComponent } from '../boundary-option-grid/boundary-option-grid.component';

@Component({
    moduleId: module.id,
    selector: 'boundary-option',
    templateUrl: 'boundary-option.component.html',
    providers: [BoundaryOptionService]
})
export class BoundaryOptionComponent implements OnInit {

    boundaryOptions: any;
    displayDialog: boolean = false;
    isNew: boolean;
    boundaryOption: any;
    boundaryId: any;
    @ViewChild("boundaryGrid") boundaryGrid: BoundaryOptionGridComponent;

    constructor(private boundaryOptionService: BoundaryOptionService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.boundaryId = params['id'];
            if (this.boundaryId) {
                this.isNew = false;
                this.getBoundaryOptions(this.boundaryId);
            } else {
                this.isNew = true;
            }
        });
    }

    remove(boundaryOptionId: Number): void {
        if (!confirm('Are you sure?')) {
            return;
        }

        this.boundaryOptionService.remove(boundaryOptionId)
            .subscribe(result => { 
                this.getBoundaryOptions(this.boundaryId); 
                this.boundaryGrid.refresh();
            });
    }

    save(): void {
        if (this.isNew) {
            this.boundaryOption.BoundaryId = this.boundaryId;
            this.boundaryOptionService.save(this.boundaryOption)
                .subscribe(this.saveCallback);
        } else {
            this.boundaryOptionService.update(this.boundaryOption.BoundaryOptionId, this.boundaryOption)
                .subscribe(this.saveCallback);
        }
    }

    addNew(): void {
        this.displayDialog = true;
        this.isNew = true;
        this.boundaryOption = {};
    }

    close(): void {
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.boundaryOption = this.cloneFilter(event.data);
        this.displayDialog = true;
    }

    private saveCallback = (result) => {
        this.getBoundaryOptions(this.boundaryId);
        this.displayDialog = false;
        this.boundaryGrid.refresh();
    };

    private cloneFilter(c: any): any {
        let boundaryOption = {};
        for (let prop in c) {
            boundaryOption[prop] = c[prop];
        }
        return boundaryOption;
    }

    private getBoundaryOptions(id): void {
        this.boundaryOptionService.getList(id)
            .subscribe(boundaryOptions => { this.boundaryOptions = boundaryOptions; });
    }
}