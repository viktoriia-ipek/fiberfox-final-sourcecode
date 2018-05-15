import { Component, OnInit } from '@angular/core';
import { PhaseService } from '../../services/phase.service';

@Component({
    moduleId: module.id,
    selector: 'phases',
    templateUrl: 'phase.component.html',
    providers: [PhaseService]
})
export class PhaseComponent implements OnInit {

    phases: any;
    displayDialog: boolean = false;
    isNew: boolean;
    phase: any;

    constructor(private phaseService: PhaseService) {

    }

    ngOnInit(): void {
        this.getData();
    }

    remove(phaseId: Number): void {
        if (!confirm('Are you sure?')) {
            return;
        }

        this.phaseService.remove(phaseId)
            .subscribe(result => {
                this.getData();
            });
    }

    save(): void {
        if (this.isNew) {
            this.phaseService.save(this.phase)
                .subscribe(this.saveCallback);
        } else {
            this.phaseService.update(this.phase.PhaseId, this.phase)
                .subscribe(this.saveCallback);
        }
        this.displayDialog = false;
    }

    addNew(): void {
        this.displayDialog = true;
        this.isNew = true;
        this.phase = {};
    }

    close(): void {
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.phase = this.clonePhase(event.data);
        this.displayDialog = true;
    }

    private saveCallback = (result) => {
        this.getData();
    };

    private clonePhase(c: any): any {
        let phase = {};
        for (let prop in c) {
            phase[prop] = c[prop];
        }
        return phase;
    }

    private getData(): void {
        this.phaseService.getList()
            .subscribe(phases => {
                this.phases = phases;
            });
    }
}