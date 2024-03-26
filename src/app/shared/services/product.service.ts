import {ElementRef, Injectable, TemplateRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, Subscription, tap} from "rxjs";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductType} from "../../../types/product.type";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private findStr: HTMLElement | null = null;
  public search: string | null = '';
  titleStr: HTMLElement | null = null;

  loading: Subject<boolean> = new Subject();

  userActivated = new Subject<string>();
  userDeactivated = new Subject<boolean>();


  constructor(private http: HttpClient, private router: Router, public modalService: NgbModal) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    }
    this.products.subscribe(() => {
      this.loading.next(false);
    })
  }

  products: Subject<ProductType[]> = new Subject<ProductType[]>();
  product: ProductType;


  getProducts(findStr?: string): void {
    const url = 'https://testologia.site/tea';
    const subscription = this.http.get<ProductType[]>(findStr ? `${url}?search=${findStr}` : url);
    this.loading.next(true);
    subscription.subscribe(
      {
        next: (data) => {
          // this.products.next(data);// = Object.values(data);
          this.products.next(Object.values(data));
          if ((Object.values(data)).length === 0) {
            this.setTitle(' Ничего не найдено! ');
          }
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/']);
        }
      })
  }


  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.site/tea?id=${id}`);
  }

  setTitle(title: string) {
    this.titleStr = (document.getElementById('title-page'));
    if (this.titleStr) this.titleStr.innerHTML = title;
  }
  testPopup(popupOrder: TemplateRef<ElementRef>) {
    this.modalService.open(popupOrder, {})
  }
    open(content: any) {
    this.modalService.open(content,{ size: 'sm' } );
  }
}
