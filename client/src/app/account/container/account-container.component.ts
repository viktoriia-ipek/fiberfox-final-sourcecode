import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'account-container',
    templateUrl: 'account-container.component.html',
    providers: [AuthService]
})
export class AccountContainerComponent implements OnInit {
    user: any;

    constructor(private authService: AuthService,
        private router: Router) {

    }

    ngOnInit(): void {
        this.user = localStorage.getItem('currentUser');
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
