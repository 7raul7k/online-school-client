import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {StudentDTO} from "../../models/api/StudentDTO";

@Injectable({
  providedIn: 'root'
})
export class StudentService implements OnInit, OnDestroy {



  private url = "http://localhost:8080/api/v1/student";
  constructor(private http: HttpClient ) { }

  ngOnInit() {


  }

  ngOnDestroy() {
  }

  getStudentById(id : number):Observable<StudentDTO>{

    return this.http.get<StudentDTO>(this.url + `/studentById?id=${id}`).pipe(catchError(this.handleError));
  }



  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(()=>'Something bad happened; please try again later.');
  };
}
