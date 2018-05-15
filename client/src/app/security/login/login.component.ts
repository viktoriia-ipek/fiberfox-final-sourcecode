import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { AlertService } from '../../shared/alert.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    // reset login status
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/account/home';
  }

  login() {
    this.authService.login(this.model.email, this.model.password)
      .subscribe(data => {
        if (localStorage.getItem('currentUser'))
          this.router.navigate([this.returnUrl]);
        else {
          this.alertService.error("Provided email or password is incorrect");
        }
      },
        error => {
          this.loading = false;
        });
  }
}
