import {Injectable, Input} from '@angular/core';
import {Subject, Subscription, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ProductService} from "./product.service";
import {ProductType} from "../types/product.type";

@Injectable(/*{
  providedIn: 'root'
}*/)
export class FinderService {
  @Input() product: ProductType;
  constructor( private http: HttpClient, private router: Router,public productService: ProductService,
      ) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    }
  }

  private isFound = '';
  public isFound$: Subject<string> = new Subject<string>();
  inputStr: string | null = '';


  public products: ProductType[] = [];
  loading: boolean = false; //true;
  private subscription: Subscription | null = null;
  private findStr: HTMLElement | null = null;
  public search: string | null = '';
  private subscription1: Subscription | null = null;

  getStr() {
    this.isFound = (document.getElementById('findStr') as HTMLInputElement).value;
    this.isFound$.next(this.isFound);
  }
  searchFinder(){
    this.inputStr=(document.getElementById('findStr') as HTMLInputElement).value;
    console.log(this.inputStr);
  }
  clearStr() {
    this.isFound ='';
    this.isFound$.next(this.isFound);
  }
  isLoggedIn(): string {
    return this.isFound;
  }
  clearFinder(){
    console.log('clearFinder');
    this.router.navigate(['/products']);
  }
  public getRouteData() {

    this.findStr = document.getElementById('findStr');
    this.loading = true;

    this.inputStr = (document.getElementById('findStr') as HTMLInputElement).value;
    console.log(this.inputStr);
    if (this.inputStr && (this.inputStr != '') && (this.inputStr !== null)) {
      this.subscription = this.productService.getProductFind(this.inputStr)
        .pipe(
          tap(() => {
           // this.loading = false;
          })
        )
        .subscribe(
          {
            next: (data) => {
              console.log(data);
              console.log('subscribe getProductFind');
              this.products = Object.values(data);
            },
            error: (error) => {
              console.log(error);
              this.router.navigate(['/']);
            }
          })
    } else (
      this.subscription1 = this.productService.getProducts()
        .pipe(
          tap(() => {
            this.loading = false;
          })
        )
        .subscribe(
          {
            next: (data) => {
              console.log(data);
              this.products = data;
              this.products =  Object.values(data);
              this.router.navigate(['/products']);
              console.log('subscribe getProduct');
            },
            error: (error) => {
              console.log(error);
              this.router.navigate(['/']);
            }
          })
    )
  }
}
