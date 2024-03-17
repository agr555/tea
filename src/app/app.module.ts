import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NgwWowModule } from 'ngx-wow';
import { ProductsComponent } from './components/page/products/products.component';
import { AdvancedComponent } from './components/common/advanced/advanced.component';
import { MainComponent } from './components/page/main/main.component';
import { OrderComponent } from './components/page/order/order.component';
import { OrderFinishComponent } from './components/page/order-finish/order-finish.component';
import { ProductCardComponent } from './components/common/product-card/product-card.component';
import {ProductService} from "./services/product.service";
import {HttpClientModule} from "@angular/common/http";
import {ShorterPipePipe} from "./pipes/shorter-pipe.pipe";
import { ProductComponent } from './components/page/product/product.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PopupComponent } from './components/common/popup/popup.component';
declare var $: any;
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    AdvancedComponent,
    MainComponent,
    OrderComponent,
    OrderFinishComponent,
    ProductCardComponent,
    ShorterPipePipe,
    ProductComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgwWowModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ ProductService],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent]
})
export class AppModule { }
