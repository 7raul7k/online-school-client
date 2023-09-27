import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {EnrolmentDTO} from "../../models/api/EnrolmentDTO";

@Injectable({
  providedIn: 'root'
})
export class EnrolmentService implements OnInit, OnDestroy {


  private url = "http://localhost:8080/api/v1/enrolment";
  constructor(private http: HttpClient ) { }

  ngOnInit() {


  }

  addEnrolment(enrolment : EnrolmentDTO) :Observable<String>{

    return this.http.post<String>(this.url + "/addEnrolment", enrolment).pipe(catchError(this.handleError));

  }

  removeEnrolment(id : number) :Observable<String>{

      return this.http.delete<String>(this.url + `/deleteEnrolment?id=${id}` ).pipe(catchError(this.handleError));


  }

  ngOnDestroy() {
  }

    handleError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){

            console.error('An error ocured:',error.error.message);
        }else{
            console.error(
                `Backend returned code ${error.status}` +
                `body was: ${error.error}`
            );
        }
        return throwError(()=> 'Something bad happened; please try again later.');
    }


}
