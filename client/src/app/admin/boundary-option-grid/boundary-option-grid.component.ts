import { Component, OnInit, Input } from '@angular/core';
import { ResultMenuService } from '../../services/result-menu.service';
import { BoundaryOptionValueService } from '../../services/boundary-option-value.service';

@Component({
    moduleId: module.id,
    selector: 'boundary-option-grid',
    templateUrl: 'boundary-option-grid.component.html',
    providers: [BoundaryOptionValueService, ResultMenuService]
})
export class BoundaryOptionGridComponent implements OnInit {

    data: any;
    @Input() boundaryId: Number;
    isSavingValues: boolean = false;

    constructor(private resultMenuService: ResultMenuService,
        private boundaryOptionValueService: BoundaryOptionValueService) {

    }

    ngOnInit(): void {
        this.getBoundaryOptionValues();
    }

    saveBoundaryOptionValues(): void {
        this.isSavingValues = true;
        this.boundaryOptionValueService.save({ resultMenu: this.getResultValues(this.data.boundaryOptionValues) })
            .subscribe(result => {
                this.getBoundaryOptionValues();
                this.isSavingValues = false;
            });
    }

    refresh() {
        this.getBoundaryOptionValues();
    }

    private getBoundaryOptionValues(): void {
        this.boundaryOptionValueService.getList(this.boundaryId)
            .subscribe(data => {
                this.data = data;
            });
    }

    private getResultValues(boundaryOptionValues) {
        return [].concat.apply([], boundaryOptionValues.map(r => r.resultMenu));
    }
}
