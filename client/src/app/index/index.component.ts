import { Component } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'index',
    templateUrl: 'index.component.html',
    providers: [AuthService]
})
export class IndexComponent {


    constructor(private authService: AuthService,
        private router: Router) {
        let user = this.authService.getLoggedInUser();
        if (user && user.success) {
            this.router.navigate(['/account/home']);
        } else {
            this.router.navigate(['/login']);
        }
    }
}
