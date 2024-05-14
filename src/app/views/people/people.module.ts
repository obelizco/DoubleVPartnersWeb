import { ViewPeopleComponent } from './components/view-people/view-people.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PeopleComponent } from './components/people/people.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    PeopleComponent,
    ViewPeopleComponent
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    SharedModule
  ],
  providers:[DialogService,MessageService]
})
export class PeopleModule { }
