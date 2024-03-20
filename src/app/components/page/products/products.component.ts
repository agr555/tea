import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {ProductType} from "../../../types/product.type";
import {Subscription, catchError, map, of, retry, tap, Subject, takeUntil} from 'rxjs';
import {FinderService} from "../../../services/finder.service";

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  @Input() product: ProductType;
  private destroy$ = new Subject<undefined>();

  constructor(private productService: ProductService, public finderService: FinderService,
              private http: HttpClient, private router: Router, private route: ActivatedRoute) {
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
  loading: boolean = false;
  private subscription: Subscription | null = null;
  private findStr: HTMLElement | null = null;
  inputStr1: HTMLInputElement | null = null;
  public search: string | null = '';
  private subscription1: Subscription | null = null;
  inputStr: string | null = '';
  titlePage: string | null = '';


  ngOnInit(): void{
    this.getRouteData();
    this.subscription = this.productService.products.subscribe((data: ProductType[]):void => {
      this.products = data;
    })
/*    this.productService.loading.subscribe( data => {
      this.loading = data;
    })*/
  }

  async getRouteData():  Promise<void> {
    this.findStr = document.getElementById('findStr');
    this.subscription1 = this.productService.loading.subscribe( data => {
      this.loading = data;
    })
    this.inputStr = (document.getElementById('findStr') as HTMLInputElement).value;
    if (this.inputStr && this.inputStr.length>0) {
      this.titlePage = 'Результаты поиска по запросу:  ' + this.inputStr;
    } else this.titlePage = 'Наши чайные коллекции';

    if (this.inputStr && (this.inputStr != '') && (this.inputStr !== null)) {
      await this.productService.getProducts(this.inputStr);
    } else {
      await this.productService.getProducts();
    }
  }

  public ngOnDestroy(): void {
    // this.destroy$.next();
    this.destroy$.complete();
    this.subscription?.unsubscribe();
    this.subscription1?.unsubscribe();
    console.log('unsubscribe: products')
  }

}
