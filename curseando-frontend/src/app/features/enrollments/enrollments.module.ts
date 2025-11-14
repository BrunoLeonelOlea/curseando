import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollFormComponent } from './enroll-form/enroll-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EnrollFormComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    EnrollFormComponent
  ]
})
export class EnrollmentsModule { }
