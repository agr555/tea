import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgwWowModule } from 'ngx-wow';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {NgbActiveModal, NgbCollapseModule, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutComponent} from "./views/layout.component";
import {HeaderComponent} from "./shared/components/layout/header/header.component";
import {FooterComponent} from "./shared/components/layout/footer/footer.component";
import {ProductService} from "./shared/services/product.service";
import {SharedModule} from "./shared/shared.module";
import {CommonModule} from "@angular/common";
import {FinderService} from "./shared/services/finder.service";
declare var $: any;
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent
    /*ProductsComponent,
    MainComponent,
    OrderComponent,
    ProductComponent,*/

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgwWowModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgbCollapseModule,
    NgbModalModule
    // CoreModule,

  ],

  // providers: [ ProductService, OrderService, ModalService, FinderService],
  providers: [ ProductService,  FinderService, NgbActiveModal],//, OrderService, ModalService, FinderService],
  bootstrap: [AppComponent]

})
export class AppModule { }
