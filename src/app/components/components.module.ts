import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DatabasesComponent } from './databases/databases.component';
import {MatSelectModule} from '@angular/material/select';
import { ApisComponent } from './apis/apis.component';
import { RequestsComponent } from './requests/requests.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import { ResultsComponent } from './results/results.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    MatSelectModule,
    MatSliderModule,
    MatGridListModule,
    MatProgressBarModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DatabasesComponent,
    ApisComponent,
    RequestsComponent,
    ResultsComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DatabasesComponent,
    ApisComponent,
    RequestsComponent,
    ResultsComponent
  ]
})
export class ComponentsModule { }
