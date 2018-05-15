export class SharedData {

    subCategory: any;
    topic: any;
    answer: any;
    filters: any;
    boundaries: any;

    constructor() {
        this.subCategory = null;
        this.topic = null;
        this.answer = null;
        this.filters = [];
        this.boundaries = [];
    }

    public hasFilters(): boolean {
        if (this.answer && this.answer.HasTargetFiltering)
            return true;

        if (this.topic && this.topic.HasTargetFiltering)
            return true;
    }

    public hasBoundaries(): boolean {
        if (this.answer && this.answer.HasBoundaryOptions)
            return true;

        if (this.topic && this.topic.HasBoundaryOptions)
            return true;
    }
}