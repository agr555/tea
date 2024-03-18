import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {ProductType} from "../../../types/product.type";
import {Subscription, catchError, map, of, retry, tap} from 'rxjs';
import {FinderService} from "../../../services/finder.service";

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() product: ProductType;

  constructor(private productService: ProductService,public finderService: FinderService,
              private http: HttpClient, private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    }
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  public products: ProductType[] = [];
  loading: boolean = false; //true;
  private subscription: Subscription | null = null;
  private findStr: HTMLElement | null = null;
  public search: string | null = '';
  private subscription1: Subscription | null = null;
  inputStr: string | null = '';
  titlePage: string | null = '';

  ngOnInit(): void {
    // this.finderService.getRouteData();
    this.getRouteData();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscription1?.unsubscribe();
    console.log('unsubscribe: products')
  }

  ngOnChanges() {
    // this.router.navigate(['/products']);
    this.getRouteData();
    console.log(' ngOnChanges');
  }


  update() {
  //  this.getRouteData();
  }

  getRouteData() {
    this.findStr = document.getElementById('findStr');
    this.loading = true;

    this.inputStr = (document.getElementById('findStr') as HTMLInputElement).value;
    if(this.inputStr) {
      this.titlePage =  'Результаты поиска по запросу:  '+ this.inputStr
    } else this.titlePage =  'Наши чайные коллекции';
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
              console.log('subscribe getProductFind!!');
              this.subscription1?.unsubscribe();
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
              this.subscription?.unsubscribe();

              this.products = data;
              this.router.navigate(['/products']);
              console.log('subscribe getProduct!');
            },
            error: (error) => {
              console.log(error);
              this.router.navigate(['/']);
            }
          })
    )
  }
}
