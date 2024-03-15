import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private subject:Subject<number>;
  lateData: Promise<string> | null = null;
  constructor() {
    this.subject = new Subject<number>();

    let count = 100;
    const interval1 =  setInterval(() => {
      this.subject.next(count++);
    }, 1000);

    const timeout1 = setTimeout(() => {
      this.subject.complete()
    }, 6000);


  }
  ngOnInit(){

    this.lateData = new Promise <string>(function (resolve) {
      setTimeout(() => {
        resolve('Hello');
      }, 3000);
    })
  }
  /*ngOnInit(): void {
  }*/

}
