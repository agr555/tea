import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {NgbCollapseModule, NgbModalModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MainComponent} from "./main/main.component";



@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    RouterModule,
    NgbModalModule,
    NgbModule,
    NgbCollapseModule
  ]
  ,
  exports: [
    HomeRoutingModule
  ]
})
export class HomeModule { }
