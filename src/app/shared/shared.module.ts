import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {RouterModule} from "@angular/router";
import {FindNameDirective} from "./directives/find-name.directive";
import {FindNamePipe} from "./pipes/find-name.pipe";
import {ShorterPipePipe} from "./pipes/shorter-pipe.pipe";
import {FinderService} from "./services/finder.service";
import {NgwWowModule} from "ngx-wow";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import { PopupFullComponent } from './components/popup-full/popup-full.component';
import { PopupInfoComponent } from './components/popup-info/popup-info.component';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    ProductCardComponent,
    FindNameDirective,
    FindNamePipe,
    ShorterPipePipe,
    PopupFullComponent,
    PopupInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // BrowserModule,
    FormsModule ,
    ReactiveFormsModule,
    NgwWowModule,
    NgbModalModule

  ],
  exports: [
    ProductCardComponent,
    FindNameDirective,
    FindNamePipe,
    ShorterPipePipe,
    NgwWowModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PopupFullComponent,
    PopupInfoComponent
  ]
})
export class SharedModule { }
