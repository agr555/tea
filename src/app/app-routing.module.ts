import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/page/main/main.component";
import {ProductsComponent} from "./components/page/products/products.component";
import {ProductComponent} from "./components/page/product/product.component";
import {OrderComponent} from "./components/page/order/order.component";
// import {OrderFinishComponent} from "./components/page/order-finish/order-finish.component";
// import {PopupComponent} from "./components/common/popup/popup.component";

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'products/:id', component: ProductComponent},
  { path: 'products/search=:', component: ProductsComponent},
  { path: 'order', component: OrderComponent},// canActivate: [AuthGuard]},
  // { path: 'order-finish', component: OrderFinishComponent},// canActivate: [AuthGuard]},
  // { path: 'popup', component: PopupComponent},// canActivate: [AuthGuard]},
  // { path: 'error', redirectTo: 'products'}, // redirect откуда/куда
  { path: '**', redirectTo: ''}, //404  или на главную
  { path: '**', component: MainComponent}, //404  или на главную
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{anchorScrolling: 'enabled', useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
