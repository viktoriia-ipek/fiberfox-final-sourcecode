import { Component, OnInit } from '@angular/core';
import { SubCategoryService } from '../../services/sub-category.service';
import { CategoryService } from '../../services/category.service';

@Component({
    moduleId: module.id,
    selector: 'sub-categories',
    templateUrl: 'sub-category.component.html',
    providers: [SubCategoryService, CategoryService]
})
export class SubCategoryComponent implements OnInit {

    subCategories: any;
    displayDialog: boolean = false;
    isNew: boolean;
    subCategory: any;

    categories: any;

    constructor(private subCategoryService: SubCategoryService,
        private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.getData();
        this.getCategories();
    }

    remove(subCategoryId: Number): void {
        if (!confirm('Are you sure?')) {
            return;
        }

        this.subCategoryService.remove(subCategoryId)
            .subscribe(result => {
                this.getData();
            });
    }

    save(): void {
        if (this.isNew) {
            this.subCategoryService.save(this.subCategory)
                .subscribe(this.saveCallback);
        } else {
            this.subCategoryService.update(this.subCategory.SubCategoryId, this.subCategory)
                .subscribe(this.saveCallback);
        }
        this.displayDialog = false;
    }

    addNew(): void {
        this.displayDialog = true;
        this.isNew = true;
        this.subCategory = {};
    }

    close(): void {
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.subCategory = this.cloneSubCategory(event.data);
        this.displayDialog = true;
    }

    private saveCallback = (result) => {
        this.getData();
    };

    private cloneSubCategory(c: any): any {
        let category = {};
        for (let prop in c) {
            category[prop] = c[prop];
        }
        return category;
    }

    private getData(): void {
        this.subCategoryService.getList()
            .subscribe(subCategories => {
                this.subCategories = subCategories;
            });
    }

    private getCategories(): void {
        this.categoryService.getList()
            .subscribe(categories => {
                this.categories = categories;
            });
    }
}