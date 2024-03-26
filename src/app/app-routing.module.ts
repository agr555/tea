import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./views/layout.component";

const routes: Routes = /*[
  { path: '', component: MainComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'products/:id', component: ProductComponent},
  { path: 'order', component: OrderComponent},// canActivate: [AuthGuard]},
  { path: '**', redirectTo: ''}, //404  или на главную
  { path: '**', component: MainComponent}, //404  или на главную
];*/
[
  {
    path:'',
    component: LayoutComponent,
    children: [
      {path: '',loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)},
      {path: 'order',loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule)},
      {path: 'products',loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule)}
    ],
  },
  { path: '**', redirectTo: ''}, //404  или на главную
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{anchorScrolling: 'enabled', useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
