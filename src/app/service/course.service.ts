import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {CourseDTO} from "../models/api/CourseDTO";
import {LoadingState} from "../models/LoadingState.enum";
import {RequestState} from "../models/RequestState";

@Injectable({
  providedIn: 'root'
})
export class CourseService implements OnInit,OnDestroy{

  private courseSubject$ = new BehaviorSubject<CourseDTO[]>([]);

  loadingSubject$ = new BehaviorSubject<LoadingState>(LoadingState.Idle);
  loadingStateAction$ = this.loadingSubject$.asObservable();
  courseAction$ = this.courseSubject$.asObservable();

  requestStateSubject$ = new BehaviorSubject<RequestState>({
    loadingState : LoadingState.Idle,
    message : "Courses are loading..."
  })

  requestStateAction$ = this.requestStateSubject$.asObservable();

  private url = "http://localhost:8080/api/v1";
  constructor(private http : HttpClient) {


    this.getCourses().subscribe({
      next : (data) =>{
        this.courseSubject$.next(data);

       this.loadingSubject$.next(LoadingState.Success);

       this.requestStateSubject$.next({
         loadingState : LoadingState.Success,
         message : "Courses are loaded."
       })
      },
      error : (err) =>{

        this.loadingSubject$.next(LoadingState.Error);

        this.requestStateSubject$.next({
          loadingState : LoadingState.Error,
          message : "Error loading courses."
        })
      }
    });

  }

  getCourses():Observable<CourseDTO[]>{

   this.loadingSubject$.next(LoadingState.Loading);

   this.requestStateSubject$.next({
     loadingState : LoadingState.Loading,
     message : "Courses are loading..."
   });


    return this.http.get<CourseDTO[]>(this.url +"/course/allCourses").pipe(catchError(this.handleError));


  }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.getCourses().subscribe({

      next : (data) =>{
        this.courseSubject$.next(data);

        this.requestStateSubject$.next({
          loadingState : LoadingState.Success,
          message : "Courses are loaded."
        })
      },
      error : (err) =>{
        console.log(err);

        this.requestStateSubject$.next({
          loadingState : LoadingState.Error,
          message : "Error loading courses."
        })
      }
    });
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
