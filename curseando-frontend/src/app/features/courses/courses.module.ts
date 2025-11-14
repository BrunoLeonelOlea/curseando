import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { EnrollmentsModule } from '../enrollments/enrollments.module';


@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    EnrollmentsModule
  ]
})
export class CoursesModule { }
