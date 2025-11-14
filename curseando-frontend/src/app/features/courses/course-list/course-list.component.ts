import { Component, OnInit } from '@angular/core';
import { Course, DifficultyFilter } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course.service';
import { Difficulty } from 'src/app/core/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent  implements OnInit {

  allCourses: Course[] = [];
  filteredCourses: Course[] = [];
  loading = true;
  error = false;
  selectedDifficulty: DifficultyFilter = 'ALL';
  Difficulty = Difficulty;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.allCourses = data;
        this.filteredCourses = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  filterByDifficulty(filter: DifficultyFilter) {
    this.selectedDifficulty = filter;
    this.filterCourses();
  }

  filterCourses() {
   if(this.selectedDifficulty === 'ALL') {
    this.filteredCourses = this.allCourses;
   } else {
    this.filteredCourses = 
      this.allCourses.filter(course => course.difficulty === this.selectedDifficulty) as Course[];
   }
  }

}
