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

  find1(){
    this.findStr = document.getElementById('findStr');
    this.loading = true;

    this.inputStr = (document.getElementById('findStr') as HTMLInputElement).value;
    console.log(this.inputStr);
    if (this.inputStr && (this.inputStr != '') && (this.inputStr !== null)) {
      this.subscription = this.productService.getProductFind(this.inputStr)
        .pipe(
          tap(() => {
            this.loading = false;
          })
        )
        .subscribe(
          {
            next: (data) => {
              console.log(data);
              console.log('subscribe getProductFind- finderService');
              this.products = Object.values(data);
            },
            error: (error) => {
              console.log(error);
              this.router.navigate(['/']);
            }
          })
    }
  }
}
