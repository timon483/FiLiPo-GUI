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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    MatSelectModule,
    MatSliderModule,
    MatGridListModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DatabasesComponent,
    ApisComponent,
    RequestsComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DatabasesComponent,
    ApisComponent,
    RequestsComponent
  ]
})
export class ComponentsModule { }
