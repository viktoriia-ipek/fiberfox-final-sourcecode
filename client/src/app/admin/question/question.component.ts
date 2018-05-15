import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';

@Component({
    moduleId: module.id,
    selector: 'question',
    templateUrl: 'question.component.html',
    providers: [QuestionService]
})
export class QuestionComponent implements OnInit {

    questions: any;

    constructor(private questionService: QuestionService) { }

    ngOnInit(): void {
        this.getData();
    }

    remove(questionId: Number): void {
        if (!confirm('Are you sure?'))
            return;

        this.questionService.remove(questionId)
            .subscribe(result => { this.getData(); });
    }

    private getData(): void {
        this.questionService.getList()
            .subscribe(questions => { this.questions = questions; });
    }
}