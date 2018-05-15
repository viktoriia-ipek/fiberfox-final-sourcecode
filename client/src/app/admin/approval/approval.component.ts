import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id,
    selector: 'approval',
    templateUrl: 'approval.component.html',
    providers: [UserService]
})
export class ApprovalComponent implements OnInit {

    users: any;

    constructor(private userService: UserService) {

    }

    ngOnInit(): void {
        this.getData();
    }

    changeApproval(isApproved, userId): void {
        if (!confirm('Are you sure?')) {
            return;
        }

        this.userService.changeApproval(userId, (isApproved ? 0 : 1))
            .subscribe(result => {
                this.getData();
            });
    }

    getData(): void {
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }
}