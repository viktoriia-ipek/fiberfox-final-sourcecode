import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ResultService } from './result.service';
import { SharedDataService } from '../../services/shared-data';
import { AuthService } from '../../security/auth.service';

@Component({
    moduleId: module.id,
    selector: 'result',
    templateUrl: 'result.component.html',
    providers: [ResultService, AuthService]
})
export class ResultComponent implements OnInit {

    relevantMenu: any;
    othersMenu: any;
    article: any;
    isQuestion: boolean = false;
    containerHeight: number = null;
    @ViewChild('leftBar') leftBarElement: ElementRef;
    @ViewChild('rightBar') rightBarElement: ElementRef;
    constructor(private dataService: ResultService,
        private sharedDataService: SharedDataService,
        private authService: AuthService,
        private el: ElementRef,
        private renderer: Renderer2
    ) {

    }

    ngOnInit(): void {
        this.getData();
        this.saveOperationLog();
        //console.log('--- Result ranking ---', this.sharedDataService.data); // TODO maybe save here for tracking purposes
    }

    showArticle(resultMenuId) {
        this.dataService.getArticles(resultMenuId)
            .subscribe(article => {
                this.article = article[0];
            });
    }

    private getData(): void {
        // decides if its result menu from filters or from questions
        // if filters then retrieves necessary data from sharedData to send to the server
        // else gets result menu based on selected question
        if (this.sharedDataService.data.filters || this.sharedDataService.data.boundaries) {
            this.isQuestion = false;
            let selectedFilters = null;
            if (this.sharedDataService.data.filters)
                selectedFilters = ([].concat.apply([], this.sharedDataService.data.filters.map(f => f.Filters)))
                    .filter(r => r.Selected === true)
                    .map(t => t.TargetFilterId)
                    .toString();

            let selectedBoundaries = null;
            if (this.sharedDataService.data.boundaries)
                selectedBoundaries = ([].concat.apply([], this.sharedDataService.data.boundaries.map(f => f.Filters)))
                    .filter(r => r.Selected === true)
                    .map(t => t.BoundaryOptionId)
                    .toString();


            this.dataService.getResultMenu(selectedFilters, selectedBoundaries)
                .subscribe(data => {
                    console.log('--- Result ranking ---', data);

                    this.relevantMenu = data.filter(d => d.Ranking > 0);
                    if (this.relevantMenu && this.relevantMenu.length > 0) {
                        console.log(this.relevantMenu.map(m => m.ResultMenuId).toString());
                        this.getAllArticles(this.relevantMenu.map(m => m.ResultMenuId).toString());
                    }
                    this.othersMenu = data.filter(d => d.Ranking <= 0);

                });
        } else {
            if (this.sharedDataService.data.answer) {
                this.dataService.getResultMenuByQuestionId(this.sharedDataService.data.answer.QuestionId)
                    .subscribe(data => {
                        console.log(data);
                        this.relevantMenu = data;
                        if (this.relevantMenu && this.relevantMenu.length > 0) {
                            console.log(this.relevantMenu.map(m => m.ResultMenuId).toString());
                            this.getAllArticles(this.relevantMenu.map(m => m.ResultMenuId).toString());
                        }
                    });
                this.isQuestion = true;
            }
        }
    }

    private saveOperationLog() {
        try {
            if (!this.sharedDataService.data) {
                return;
            }
            let log = this.sharedDataService.data;
            this.dataService.saveOperationLog({
                UserId: this.authService.getLoggedInUser().user.UserId,
                SubCategoryId: log.subCategory ? log.subCategory : null,
                ActivityId: log.topic && log.topic.ActivityId ? log.topic.ActivityId : null,
                PhaseId: log.topic && log.topic.PhaseId ? log.topic.PhaseId : null,
                TopicId: log.topic && log.topic.TopicId ? log.topic.TopicId : null,
                QuestionId: log.answer && log.answer.QuestionId ? log.answer.QuestionId : null,
            })
                .subscribe(result => {
                    console.log('height');

                    setTimeout(() => {
                        console.log(this.leftBarElement.nativeElement.offsetHeight);
                        console.log(this.rightBarElement.nativeElement.offsetHeight);
                        if (this.leftBarElement.nativeElement.offsetHeight >= this.rightBarElement.nativeElement.offsetHeight) {
                            this.renderer.addClass(this.leftBarElement.nativeElement, 'leftBoxStyle');
                        }
                        else {
                            this.renderer.addClass(this.rightBarElement.nativeElement, 'right-box-result-style');
                        }
                    }, 5000);


                    console.log("Log saved");
                });

        } catch (error) {
            console.log("Log error. Nevermind the dog", error);
        }
    }

    private getAllArticles(menuList) {
        this.dataService.getMultipleArticles(menuList)
            .subscribe(d => {
                this.article = d[0];
                d.forEach(element => {
                    this.article.Description += element.Description;
                });
            });
    }
}
