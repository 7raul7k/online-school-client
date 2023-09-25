import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CourseDTO} from "../../../models/api/CourseDTO";
import {CourseService} from "../../../service/course.service";

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

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }


}
