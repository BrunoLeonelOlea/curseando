import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Course } from "../models/course.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class CourseService {
    private apiUrl = `${environment.apiUrl}/courses`;

    constructor(private http: HttpClient){}
    
    getAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(this.apiUrl);
    }

    getCourseById(id: number): Observable<Course> {
        return this.http.get<Course>(`${this.apiUrl}/${id}`);
    }
}