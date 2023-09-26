import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from "../../service/course-service/course.service";
import {Observable} from "rxjs";
import {CourseDTO} from "../../models/api/CourseDTO";
import {LoadingState} from "../../models/LoadingState.enum";
import {RequestState} from "../../models/RequestState";
import {EnrolmentDTO} from "../../models/api/EnrolmentDTO";
import {EnrolmentService} from "../../service/enrolment-service/enrolment.service";

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

   enrolmentAction$ : Observable<EnrolmentDTO[]> | undefined;

   message : string = "";


  constructor(private courseService : CourseService,private enrolmentService : EnrolmentService) {
  }

  ngOnInit() {
    this.courseAction$ = this.courseService.courseAction$;

    this.loadingAction$ = this.courseService.loadingStateAction$;

    this.enrolmentAction$ = this.enrolmentService.enrolmentAction$;
    }

    ngOnDestroy() {

    }


}
