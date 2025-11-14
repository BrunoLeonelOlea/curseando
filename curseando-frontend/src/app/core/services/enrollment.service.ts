import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Enrollment, EnrollmentRequest } from "../models/enrollment.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class EnrollmentService {

    private apiUrl = `${environment.apiUrl}/enrollments`;

    constructor(private http: HttpClient){}
    
    enrollStudent(courseId: number, request: EnrollmentRequest): Observable<Enrollment> {
        return this.http.post<Enrollment>(`${this.apiUrl}/${courseId}/enroll`, request);
    }

}