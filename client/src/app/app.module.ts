import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { HomeComponent } from './account/home/home.component';
import { IndexComponent } from './index/index.component';
import { AuthGuard } from './security/auth.guard';
import { AdminContainerComponent } from './admin/container/admin-container.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditorModule } from 'primeng/editor';

import { LoginComponent } from './security/login/login.component';
import { SignUpComponent } from './security/signup/signup.component';
import { BusStopComponent } from './busstop/busstop.component';
import { AccountContainerComponent } from './account/container/account-container.component';
import { AdminGuard } from './security/admin.guard';
import { ApprovalComponent } from './admin/approval/approval.component';
import { SideNavComponent } from './admin/sidenav/sidenav.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from './admin/category/category.component';
import { SubCategoryComponent } from './admin/sub-category/sub-category.component';
import { PhaseComponent } from './admin/phase/phase.component';
import { TopicComponent } from './admin/topic/topic.component';
import { ArticleComponent } from './admin/article/article.component';
import { ResultMenuComponent } from './admin/result-menu/result-menu.component';
import { QuestionComponent } from './admin/question/question.component';
import { EditComponent } from './admin/question/edit/edit-question.component';
import { FilterGroupComponent } from './admin/filter-group/filter-group.component';
import { FiltersComponent } from './admin/filters/filters.component';
import { FilterGridComponent } from './admin/filter-grid/filter-grid.component';
import { BoundaryComponent } from './admin/boundary/boundary.component';
import { BoundaryOptionComponent } from './admin/boundary-option/boundary-option.component';
import { BoundaryOptionGridComponent } from './admin/boundary-option-grid/boundary-option-grid.component';
import { StartComponent } from './account/start/start.component';
import { WizardComponent } from './account/wizard/wizard.component';
import { GridComponent } from './account/grid/grid.component';
import { TopicsComponent } from './account/topics/topics.component';
import { QuestionsComponent } from './account/questions/questions.component';
import { FiltersFrontComponent } from './account/filters/filters-front.component';
import { BoundariesFrontComponent } from './account/boundaries/boundaries-front.component';
import { SharedDataService } from './services/shared-data';
import { ResultComponent } from './account/result/result.component';
import { ThankYouComponent } from './account/thankyou/thankyou.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './shared/alert.service';
import { ActivityComponent } from './admin/activity/activity.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      // public components
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: IndexComponent },
      { path: 'busstop', component: BusStopComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent }, // TODO call it 'signup'

      // authenticated user components
      {
        path: 'account',
        component: AccountContainerComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'start', component: StartComponent },
          { path: 'grid/:id', component: GridComponent },
          { path: 'topics/:pid/:scid/:actid', component: TopicsComponent },
          { path: 'questions/:id', component: QuestionsComponent },
          { path: 'filters/:id', component: FiltersFrontComponent },
          { path: 'boundaries/:id', component: BoundariesFrontComponent },
          { path: 'result', component: ResultComponent },
          { path: 'thankyou', component: ThankYouComponent },
          { path: '**', redirectTo: 'home' }
        ]
      },

      // admin dashboard
      {
        path: 'admin',
        component: AdminContainerComponent,
        canActivate: [AdminGuard],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'approval', component: ApprovalComponent },
          { path: 'categories', component: CategoryComponent },
          { path: 'subcategories', component: SubCategoryComponent },
          { path: 'phases', component: PhaseComponent },
          { path: 'activities', component: ActivityComponent },
          { path: 'topics', component: TopicComponent },
          { path: 'articles', component: ArticleComponent },
          { path: 'resultmenu', component: ResultMenuComponent },
          { path: 'questions', component: QuestionComponent },
          { path: 'questions/edit', component: EditComponent },
          { path: 'questions/edit/:id', component: EditComponent },
          { path: 'filters', component: FilterGroupComponent },
          { path: 'filters/details/:id', component: FiltersComponent },
          { path: 'boundaries', component: BoundaryComponent },
          { path: 'boundaries/details/:id', component: BoundaryOptionComponent }
        ]
      },
      { path: '**', redirectTo: 'index' }
    ]),

    TableModule,
    DialogModule,
    MultiSelectModule,
    EditorModule
  ],
  declarations: [
    // front user components
    StartComponent,
    GridComponent,
    TopicsComponent,
    QuestionsComponent,
    FiltersFrontComponent,
    BoundariesFrontComponent,
    ResultComponent,
    ThankYouComponent,

    AlertComponent,
    WizardComponent,

    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    AdminContainerComponent,
    SignUpComponent,
    BusStopComponent,
    IndexComponent,
    AccountContainerComponent,

    // admin components
    ApprovalComponent,
    SideNavComponent,
    CategoryComponent,
    SubCategoryComponent,
    ActivityComponent,
    PhaseComponent,
    TopicComponent,
    ArticleComponent,
    ResultMenuComponent,
    QuestionComponent,
    EditComponent,  // TODO Rename to question edit component
    FilterGroupComponent,
    FiltersComponent,
    FilterGridComponent,
    BoundaryComponent,
    BoundaryOptionComponent,
    BoundaryOptionGridComponent
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    SharedDataService,
    AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
