import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Enrollment } from "../models/enrollment.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class EnrollmentService {

    private apiUrl = `${environment.apiUrl}/enrollments`;

    constructor(private http: HttpClient){}
    
    enrollStudent(data: Enrollment): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }

}