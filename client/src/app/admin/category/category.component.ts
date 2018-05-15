import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
    moduleId: module.id,
    selector: 'categories',
    templateUrl: 'category.component.html',
    providers: [CategoryService]
})
export class CategoryComponent implements OnInit {

    categories: any;
    displayDialog: boolean = false;
    isNew: boolean;
    category: any;

    constructor(private categoryService: CategoryService) {

    }

    ngOnInit(): void {
        this.getData();
    }

    remove(categoryId: Number): void {
        if (!confirm('Are you sure?')) {
            return;
        }

        this.categoryService.remove(categoryId)
            .subscribe(result => {
                console.log(result);
                this.getData();
            });
    }

    save(): void {
        if (this.isNew) {
            this.categoryService.save(this.category)
                .subscribe(this.saveCallback);
        } else {
            this.categoryService.update(this.category.CategoryId, this.category)
                .subscribe(this.saveCallback);
        }
        this.displayDialog = false;
    }

    addNew(): void {
        this.displayDialog = true;
        this.isNew = true;
        this.category = {};
    }

    close(): void {
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.category = this.cloneCategory(event.data);
        this.displayDialog = true;
    }

    private saveCallback = (result) => {
        this.getData();
    };

    private cloneCategory(c: any): any {
        let category = {};
        for (let prop in c) {
            category[prop] = c[prop];
        }
        return category;
    }

    private getData(): void {
        this.categoryService.getList()
            .subscribe(categories => {
                this.categories = categories;
            });
    }
}