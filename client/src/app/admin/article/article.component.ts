import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ResultMenuService } from '../../services/result-menu.service';

@Component({
    moduleId: module.id,
    selector: 'articles',
    templateUrl: 'article.component.html',
    providers: [ArticleService, ResultMenuService]
})
export class ArticleComponent implements OnInit {

    articles: any;
    displayDialog: boolean = false;
    isNew: boolean;
    article: any;

    resultMenu: any;

    constructor(private articleService: ArticleService,
        private resultMenuService: ResultMenuService) { }

    ngOnInit(): void {
        this.getData();
        this.getResultMenu();
    }

    remove(articleId: Number): void {
        if (!confirm('Are you sure?')) {
            return;
        }

        this.articleService.remove(articleId)
            .subscribe(result => {
                this.getData();
            });
    }

    save(): void {
        if (this.isNew) {
            this.articleService.save(this.article)
                .subscribe(this.saveCallback);
        } else {
            this.articleService.update(this.article.ArticleId, this.article)
                .subscribe(this.saveCallback);
        }
        this.displayDialog = false;
    }

    addNew(): void {
        this.displayDialog = true;
        this.isNew = true;
        this.article = {};
    }

    close(): void {
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.article = this.cloneArticle(event.data);
        this.displayDialog = true;
    }

    private saveCallback = (result) => {
        this.getData();
    };

    private cloneArticle(c: any): any {
        let article = {};
        for (let prop in c) {
            article[prop] = c[prop];
        }
        return article;
    }

    private getData(): void {
        this.articleService.getList()
            .subscribe(articles => {
                this.articles = articles;
            });
    }

    private getResultMenu(): void {
        this.resultMenuService.getList()
            .subscribe(resultMenu => {
                this.resultMenu = resultMenu;
            });
    }
}