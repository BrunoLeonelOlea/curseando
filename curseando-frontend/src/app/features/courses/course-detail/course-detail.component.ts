import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit{

  course!: Course;

  loading = true;
  error = false;
  errorMessage = '';
  successMessage = '';

  constructor(private courseService: CourseService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if(courseId) {
      this.loadCourse(+courseId);
    }
  }

  loadCourse(courseId: number) {
    this.loading = true;
    this.error = false;

    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.course = course;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.errorMessage = 'Error al cargar el curso';
        this.loading = false;
      }
    });

  }

  onEnrollSuccess(): void {
    this.successMessage = '¡Inscripción exitosa! Te has registrado correctamente al curso.';
    this.error = false;
    this.errorMessage = '';
    
    // Recargar el curso para actualizar los cupos disponibles
    this.loadCourse(this.course.id);
    
    // Limpiar el mensaje después de 5 segundos
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  }

  onEnrollError(errorMessage: string): void {
    this.errorMessage = errorMessage;
    this.error = true;

    setTimeout(() => {
      this.error = false;
      this.errorMessage = '';
    }, 5000);
  }


}
  
