import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { SignUpModel } from './signup.model';
import { IndustryFieldService } from '../../services/industry-field.service';
import { ExperienceLevelService } from '../../services/experience-level.service';
import { ActivityFieldService } from '../../services/activity-field.service';
import { AlertService } from '../../shared/alert.service';

@Component({
  moduleId: module.id,
  selector: 'signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
  providers: [AuthService, IndustryFieldService, ActivityFieldService, ExperienceLevelService]
})
export class SignUpComponent implements OnInit {
  model: SignUpModel = new SignUpModel();
  industryFields: any;
  activityFields: any;
  experienceLevels: any;

  constructor(private authService: AuthService,
    private industryFieldService: IndustryFieldService,
    private activityFieldService: ActivityFieldService,
    private experienceLevelService: ExperienceLevelService,
    private alertService: AlertService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getPageData();
  }

  createUser(): void {
    this.authService.createUser(this.model)
      .subscribe(response => {
        console.log(response);
        if (response && response.success) {
          this.alertService.success("Successfully registered. Login now");
          this.router.navigate(['/login']);
        } else {
          this.alertService.error("Registration failed! Please come back later.");
        }
      });
  }

  private getPageData(): any {
    this.industryFieldService.getList()
      .subscribe(fields => this.industryFields = fields);

    this.activityFieldService.getList()
      .subscribe(fields => this.activityFields = fields);

    this.experienceLevelService.getList()
      .subscribe(levels => this.experienceLevels = levels);
  }
}