import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {EnrolmentDTO} from "../../models/api/EnrolmentDTO";

@Injectable({
  providedIn: 'root'
})
export class EnrolmentService implements OnInit, OnDestroy {

  private enrolmentSubject$ = new BehaviorSubject<EnrolmentDTO[]>([]);

  enrolmentAction$ = this.enrolmentSubject$.asObservable();

  private url = "http://localhost:8080/api/v1/enrolment";
  constructor(private http: HttpClient ) { }

  ngOnInit() {
  }

  getAllEnrolments() : Observable<EnrolmentDTO[]> {
    return this.http.get<EnrolmentDTO[]>(this.url + "/allEnrolments").pipe(catchError(this.handleError));

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
