import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from "../../service/course-service/course.service";
import {Observable, pluck} from "rxjs";
import {CourseDTO} from "../../models/api/CourseDTO";
import {LoadingState} from "../../models/LoadingState.enum";
import {RequestState} from "../../models/RequestState";
import {EnrolmentDTO} from "../../models/api/EnrolmentDTO";
import {EnrolmentService} from "../../service/enrolment-service/enrolment.service";
import {StudentService} from "../../service/student-service/student.service";
import {StudentDTO} from "../../models/api/StudentDTO";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    userId = 1;
    courseAction$: Observable<CourseDTO[]> | undefined;
    LoadingState = LoadingState;
    enrolmentAction$: Observable<EnrolmentDTO[]> | undefined;
    requestStateAction$: Observable<RequestState> | undefined;



    username: StudentDTO = {
        firstName: "",
        lastName: "",
        email: "",
        age: 0,
        address: ""
    }

    constructor(private courseService: CourseService, private enrolmentService: EnrolmentService, private studentService: StudentService) {



    }

    ngOnInit() {

        this.requestStateAction$ = this.courseService.requestStateAction$;
        this.courseAction$ = this.courseService.courseAction$;


        this.studentService.getStudentById(this.userId).subscribe({

            next: (data) => {
                this.username = data;
            }, error: (err) => {
                console.log(err);
            }
        })

    }

    ngOnDestroy() {

    }

    handleSubscribe(course: any) {

         this.enrolmentService.addEnrolment({course: course, student: this.username}).subscribe({
            next: () => {
                console.log("Enrolment added");

            }, error: (err) => {
                console.log(err);
            }
        });



    }

     handleUnSubscribe(course: CourseDTO) {

        this.enrolmentService.removeEnrolment(this.userId).subscribe({
            next: () => {

            }, error: (err) => {
                console.log(err);
            }
        })
    }
}
