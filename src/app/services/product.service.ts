import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../types/product.type";
import {Observable, Subject, Subscription, tap} from "rxjs";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Injectable(/*{
  providedIn: 'root'
}*/)
export class ProductService {

  constructor(private http: HttpClient, private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',

    }
  }
  products: Subject <ProductType[]>  = new Subject<ProductType[]>();
  product: ProductType;

  getProducts(findStr?: string): void {
    const url= 'https://testologia.site/tea';
    const subscription = this.http.get<ProductType[]>(findStr? `${url}?search=${findStr}`:url);
    console.log(subscription);
    subscription.subscribe(
      {
        next: (data) => {
          console.log(data);
          // this.products.next(data);// = Object.values(data);
          this.products.next( Object.values(data));
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/']);
        }
      })
  }

  getProduct(id: number): Observable<ProductType> {
    console.log(this.http.get<ProductType>(`https://testologia.site/tea?id=${id}`));
    return this.http.get<ProductType>(`https://testologia.site/tea?id=${id}`);
  }

/*  inputStr: string | null = '';
  private subscription: Subscription | null = null;*/

/*  searchFinder(){
    console.log(123);
    this.inputStr=(document.getElementById('findStr') as HTMLInputElement).value;
    console.log(this.inputStr);
    // this.subscription = this.productService.getProducts()
    this.subscription = this.getProductFind(this.inputStr)
      .pipe(
        tap(() => {
         // this.loading = false;
        })
      )
      .subscribe(
        {
          next: (data) => {
            console.log(data);
         /!*   Object.keys(data);
            Object.values(data);*!/
            this.products = Object.values(data);
            this.router.navigate(['/products']);
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        })
  }*/

/*//создание заказа следует вынести в отдельный сервис!
  sendOrder(data: { //product: string, address: string, phone: string
    name: string, last_name: string, phone: string, country: string, zip: string,
    product: string, address: string, comment: string
  }) {

    return this.http.post<{ success: boolean, message?: string }>(`https://testologia.site/order-tea`, data);
  }*/

}
