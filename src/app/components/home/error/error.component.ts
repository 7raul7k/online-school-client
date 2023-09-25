import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit,OnDestroy{

  @Input() message : string = "";
  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
