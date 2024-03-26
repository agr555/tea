import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {OrderComponent} from "./order.component";
import {NgbModalModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    OrderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    OrderRoutingModule,
    NgbModalModule,
    NgbModule,
  ],
  exports: [
    OrderRoutingModule
  ]
})
export class OrderModule { }
