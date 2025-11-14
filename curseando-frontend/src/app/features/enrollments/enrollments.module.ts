import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollFormComponent } from './enroll-form/enroll-form.component';


@NgModule({
  declarations: [
    EnrollFormComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule
  ]
})
export class EnrollmentsModule { }
