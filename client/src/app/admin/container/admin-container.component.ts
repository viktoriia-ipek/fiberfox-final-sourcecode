import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'admin-container',
    templateUrl: 'admin-container.component.html',
    styleUrls: ['admin-container.component.css'],
    providers: [AuthService]
})
export class AdminContainerComponent implements OnInit {

    currentUser: any;

    constructor(private authService: AuthService,
        private router: Router) {

    }

    ngOnInit(): void {
        this.currentUser = this.authService.getLoggedInUser();
        if (!this.currentUser || !this.currentUser.user || !this.currentUser.user.IsAdmin) {
            this.router.navigate(['/account/home']);
        }
    }

}
