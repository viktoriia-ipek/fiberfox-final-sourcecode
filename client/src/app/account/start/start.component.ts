import { Component, OnInit } from '@angular/core';
import { CategoriesFrontService } from './categories-front.service';

@Component({
    moduleId: module.id,
    selector: 'start',
    templateUrl: 'start.component.html',
    providers: [CategoriesFrontService]
})
export class StartComponent implements OnInit {

    data: any;

    constructor(private dataService: CategoriesFrontService) {

    }

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        this.dataService.getCategories()
            .subscribe(data => { this.data = data; console.log(this.data) });
    }
}
