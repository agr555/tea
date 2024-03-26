import {Injectable, Input} from '@angular/core';
import {Subject, Subscription, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ProductService} from "./product.service";
import {ProductType} from "../../../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class FinderService {
  @Input() product: ProductType;

  constructor(private http: HttpClient, private router: Router, public productService: ProductService,
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


  public products: ProductType[] = [];
 // loading: boolean = false; //true;
  public search: string | null = '';

  find1(findStr: string) {
 //   this.loading = true;
    // this.inputStr = (document.getElementById('findStr') as HTMLInputElement).value;
    if (findStr && (findStr != '') && (findStr !== null)) {
      const count = this.productService.getProducts(findStr);
    }
  }
}
