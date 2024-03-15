import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {ProductType} from "../../../types/product.type";
import { Subscription, catchError, map, of, retry, tap } from 'rxjs';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor( private productService: ProductService,
               private http: HttpClient, private router: Router) { }
  public products: ProductType[] = [];
  loading: boolean = false; //true;
  private subscription: Subscription | null = null;
  ngOnInit() {
    this.loading = true;
    this.subscription = this.productService.getProducts()
      .pipe (
        tap(() =>{
          this.loading = false;
        })
      )
      .subscribe(
        {
          next: (data) => {
            console.log(data);
            this.products = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        })
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
    console.log('unsubscript: products')
  }
}
