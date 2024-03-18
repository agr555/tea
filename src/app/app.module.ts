import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NgwWowModule } from 'ngx-wow';
import { ProductsComponent } from './components/page/products/products.component';
import { MainComponent } from './components/page/main/main.component';
import { OrderComponent } from './components/page/order/order.component';
import { ProductCardComponent } from './components/common/product-card/product-card.component';
import {ProductService} from "./services/product.service";
import {HttpClientModule} from "@angular/common/http";
import {ShorterPipePipe} from "./pipes/shorter-pipe.pipe";
import { ProductComponent } from './components/page/product/product.component';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {OrderService} from "./services/order.service";
import {ModalService} from "./services/modal.service";
import { FindNamePipe } from './pipes/find-name.pipe';
import { FindNameDirective } from './directives/find-name.directive';
import {FinderService} from "./services/finder.service";
declare var $: any;
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    MainComponent,
    OrderComponent,
    ProductCardComponent,
    ShorterPipePipe,
    ProductComponent,
    FindNamePipe,
    FindNameDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgwWowModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ ProductService, OrderService, ModalService, FinderService],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent]
})
export class AppModule { }
