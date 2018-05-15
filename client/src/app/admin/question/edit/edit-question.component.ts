import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { TopicService } from '../../../services/topic.service';
import { ResultMenuService } from '../../../services/result-menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionModel } from './question-model';

@Component({
    moduleId: module.id,
    selector: 'edit-question',
    templateUrl: 'edit-question.component.html',
    styleUrls: ['edit-question.component.css'],
    providers: [QuestionService, TopicService, ResultMenuService]
})
export class EditComponent implements OnInit {

    model: QuestionModel;
    topics: any;
    resultMenuItems: any;
    isNew: boolean;

    constructor(private questionService: QuestionService,
        private topicService: TopicService,
        private resultMenuService: ResultMenuService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let id = params['id'];
            if (id) {
                this.isNew = false;
                this.getQuestion(id);
            } else {
                this.isNew = true;
                this.model = new QuestionModel();
            }
        });
        this.getPageData();
    }

    private save(): void {
        console.log(this.model);
        if (this.isNew) {
            this.questionService.save(this.model)
                .subscribe(result => {
                    this.router.navigate(['/admin/questions']);
                });
        } else {
            this.questionService.update(this.model.QuestionId, this.model)
                .subscribe(result => {
                    this.router.navigate(['/admin/questions']);
                });
        }
    }

    private getQuestion(id: Number): void {
        this.questionService.getById(id)
            .subscribe(model => {
                this.model = model;
                console.log(this.model);
                //this.getPageData();
            });
    }

    private getPageData(): void {
        this.topicService.getList()
            .subscribe(topics => { this.topics = topics; });

        this.resultMenuService.getList()
            .subscribe(resultMenuItems => { this.resultMenuItems = resultMenuItems; });
    }
}