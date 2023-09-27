import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CourseDTO} from "../../../models/api/CourseDTO";
import {CourseService} from "../../../service/course-service/course.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit,OnDestroy{

  @Input() course : CourseDTO = {
    name : "",
    department : "",
    description : ""
  }

  @Output() onSubscribe = new EventEmitter<CourseDTO>();

  @Output() onUnSubscribe = new EventEmitter<CourseDTO>();
  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  addSubscribe(course : CourseDTO){
    this.onSubscribe.emit(course);

  }

  unSubscribe(course : CourseDTO){
    this.onUnSubscribe.emit(course);
  }


}
