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
  titleStr: HTMLElement | null = null;

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
  private subscrProducts: Subscription | null = null;
  private findStr: HTMLElement | null = null;
  inputStr1: HTMLInputElement | null = null;
  public search: string | null = '';
  private subscrLoader: Subscription | null = null;
  private subscrActivate: Subscription | null = null;
  private subscrDeactivate: Subscription | null = null;
  inputStr: string | null = '';
  titlePage: string | null = '';


  ngOnInit(): void {
    this.getRouteData();
    this.subscrProducts = this.productService.products.subscribe((data: ProductType[]): void => {
      this.products = data;
    })
    /*  this.productService.loading.subscribe( data => {
        this.userActivated = data;
  */
    this.titlePage = 'Наши чайные коллекции';

  }

  async getRouteData(): Promise<void> {
    this.findStr = document.getElementById('findStr');
    this.inputStr = (document.getElementById('findStr') as HTMLInputElement).value;
    this.titleStr = (document.getElementById('title-page'));
    //if(this.titleStr)     this.titleStr.innerHTML = title
    this.subscrLoader = this.productService.loading.subscribe(data => {
      this.loading = data;
    })
    this.subscrActivate = this.productService.userActivated.subscribe((str) => {
      if ((str) && (str !== '') && (str !== null)) {
        this.titlePage = 'Результаты поиска по запросу:  ' + str;
        console.log('нажат поиск и установлено Результаты поиска по запросу(поиск):  ' + str);
        if (this.titleStr) this.titleStr.innerHTML = this.titlePage;
      }
    });

    this.subscrDeactivate = this.productService.userDeactivated.subscribe((data) => {
      this.titlePage = 'Наши чайные коллекции';
      console.log('нажат сброс и установлено Наши чайные коллекции');
      if (this.titleStr) this.titleStr.innerHTML = this.titlePage;
    });

    /*
      if (this.inputStr && this.inputStr.length>0) {
        this.titlePage = 'Результаты поиска по запросу c главной страницы:  ' + this.inputStr;
      }
  */
    if (this.inputStr && (this.inputStr != '') && (this.inputStr !== null)) {
      await this.productService.getProducts(this.inputStr);
      this.titlePage = 'Результаты поиска по запросу c главной страницы:' + this.inputStr;
      console.log('Получаем продукты с поиском с главной страницы');
    } else {
      await this.productService.getProducts();
      console.log('Получаем все продукты');

    }
  }

  public ngOnDestroy(): void {
    // this.destroy$.next();
    this.destroy$.complete();
    this.subscrProducts?.unsubscribe();
    this.subscrLoader?.unsubscribe();
    this.subscrActivate?.unsubscribe();
    this.subscrDeactivate?.unsubscribe();
    console.log('unsubscribe: products');
    this.inputStr1 = (document.getElementById('findStr') as HTMLInputElement)//.value;
    if (this.inputStr1 && this.inputStr1.value !== '' && this.inputStr1.value !== null) {
      this.inputStr1.value = '';
    }
  }
}
