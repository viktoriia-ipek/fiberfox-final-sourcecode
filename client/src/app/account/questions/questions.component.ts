import { Component, OnInit } from '@angular/core';
import { QuestionsFrontService } from './questions-front.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data';

@Component({
    moduleId: module.id,
    selector: 'questions',
    templateUrl: 'questions.component.html',
    providers: [QuestionsFrontService]
})
export class QuestionsComponent implements OnInit {

    data: any;
    topicId: Number;

    constructor(private dataService: QuestionsFrontService,
        private sharedData: SharedDataService,
        private route: ActivatedRoute,
        private router: Router) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.topicId = +params['id'];
            this.getData(this.topicId);
        });
    }

    selectAnswer(answer) {

        this.setSharedData(answer);

        console.log(answer);

        if (answer.HasTargetFiltering) {
            this.router.navigate(['/account/filters', answer.TopicId]);
        } else if (answer.HasBoundaryOptions) {
            this.router.navigate(['/account/boundaries', answer.TopicId]);
        } else {
            this.router.navigate(['/account/result']);
        }
    }

    private getData(topicId): void {
        this.dataService.getQuestions(topicId)
            .subscribe(data => { this.data = data; console.log(this.data) });
    }

    private setSharedData(answer) {
        this.sharedData.data.answer = answer;
        this.sharedData.data.filters = null;
        this.sharedData.data.boundaries = null;
    }

    

}
