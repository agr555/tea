import { Component } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { Subscription } from 'rxjs';
import {NavigationEnd, Router} from "@angular/router";
// import $ from 'jquery';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'  ,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'teaCollection';
 // $("#accordion").accordion();

}
