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
    menuItemClicked: boolean = false;
    showRelevantMenu: boolean = true;
    showOthersMenu: boolean = true;
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
        window.addEventListener('scroll', this.highlightMenuOnScroll);
        //console.log('--- Result ranking ---', this.sharedDataService.data); // TODO maybe save here for tracking purposes
    }

    ngOnDestroy(): void {
        window.removeEventListener('scroll', this.highlightMenuOnScroll);
    }

    showArticle(resultMenuId) {
        this.menuItemClicked = true;
        $('.relevantMenu-ul li').removeClass('highlightMenu');
        $('.relevantMenu-ul li[id=menu'+ resultMenuId +']').addClass('highlightMenu');
        $('.othersMenu-ul li').removeClass('highlightMenu');
        $('.othersMenu-ul li[id=menu'+ resultMenuId +']').addClass('highlightMenu');
        this.dataService.getArticles(resultMenuId)
            .subscribe(article => {
                this.article = article[0];
            });
    }

    highlightMenuOnScroll() {
        $('.descriptionOuterStyle').each(function() {
            if($(window).scrollTop() >= $(this).offset().top - 30) {
                var id = $(this).attr('id');
                $('.relevantMenu-ul li').removeClass('highlightMenu');
                $('.relevantMenu-ul li[id=menu'+ id +']').addClass('highlightMenu');
            }
        });
    }

    collapseRelevantMenu() {
        this.showRelevantMenu = !this.showRelevantMenu;
    }

    collapseOthersMenu() {
        this.showOthersMenu = !this.showOthersMenu;
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
                    this.relevantMenu = [];
                    this.relevantMenu = data.filter(d => d.Ranking > 0);
                    if (this.relevantMenu && this.relevantMenu.length > 0) {
                        for(let i=0; i < this.relevantMenu.length; i++) {
                            this.dataService.getArticles(this.relevantMenu[i].ResultMenuId)
                            .subscribe(article => {
                                this.relevantMenu[i].Description = article[0].Description
                            });
                        }
                        console.log("relevantmenu", this.relevantMenu)
                        // console.log(this.relevantMenu.map(m => m.ResultMenuId).toString());
                    }
                    this.othersMenu = data.filter(d => d.Ranking <= 0);

                });
        } else {
            if (this.sharedDataService.data.answer) {
                this.dataService.getResultMenuByQuestionId(this.sharedDataService.data.answer.QuestionId)
                    .subscribe(data => {
                        console.log(data);
                        this.relevantMenu = [];
                        this.relevantMenu = data;
                        if (this.relevantMenu && this.relevantMenu.length > 0) {
                            for(let i=0; i < this.relevantMenu.length; i++) {
                                this.dataService.getArticles(this.relevantMenu[i].ResultMenuId)
                                .subscribe(article => {
                                    this.relevantMenu[i].Description = article[0].Description
                                });
                            }
                            // this.showArticle(this.relevantMenu[0].ResultMenuId);
                            console.log(this.relevantMenu.map(m => m.ResultMenuId).toString());
                            
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
                        if(this.leftBarElement.nativeElement.offsetHeight >= this.rightBarElement.nativeElement.offsetHeight)
                        {
                            this.renderer.addClass(this.leftBarElement.nativeElement,'leftBoxStyle');
                        }
                        else {
                            this.renderer.addClass(this.rightBarElement.nativeElement,'right-box-result-style');
                        }
                    }, 5000);


                    console.log("Log saved");
                });

        } catch (error) {
            console.log("Log error. Nevermind the dog", error);
        }
    }

    
}
