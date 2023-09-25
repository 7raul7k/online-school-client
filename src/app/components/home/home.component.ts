import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from "../../service/course.service";
import {Observable} from "rxjs";
import {CourseDTO} from "../../models/api/CourseDTO";
import {LoadingState} from "../../models/LoadingState.enum";
import {RequestState} from "../../models/RequestState";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy{

    userId=1;
   courseAction$ : Observable<CourseDTO[]> | undefined;
   loadingAction$ : Observable<LoadingState> | undefined;
   LoadingState = LoadingState;

   message : string = "";


  constructor(private courseService : CourseService) {
  }

  ngOnInit() {
    this.courseAction$ = this.courseService.courseAction$;

    this.loadingAction$ = this.courseService.loadingStateAction$;
    }

    ngOnDestroy() {

    }


}
