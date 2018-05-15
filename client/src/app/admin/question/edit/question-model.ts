export class QuestionModel {
    QuestionId: number;
    QuestionText: String;
    CreateTime: Date;
    TopicId: Number;
    HasTargetFiltering: Boolean;
    HasBoundaryOptions: Boolean;
    ResultMenuItems: any[];
}