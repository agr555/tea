import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, NgForm, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {OrderService} from "../../../services/order.service";
import {ModalService} from "../../../services/modal.service";

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
/*  private modalObservable: Observable<string>;// = null;
  private modalSubscription: Subscription | null = null;*/

  private modal: HTMLElement| null = null;
  private formOrder: HTMLElement| null = null;
  private errorOrder: HTMLElement| null = null;
  // private errorTitle: HTMLElement| null = null;
  private modalObservable: Observable<string>;// = null;
  private modalSubscription: Subscription | null = null;
  public modalText:string |null ='';
  checkoutForm = this.fb.group({
    product: [''],// Validators.required],
    name: ['', [Validators.required, Validators.pattern("^[a-zA-Zа-яА-Я]+$")]],
    last_name: ['', [Validators.required, Validators.pattern("^[a-zA-Zа-яА-Я]+$")]],
    phone: ['', [Validators.required, Validators.pattern("^[+][0-9]{11}$")]],
    country: ['', Validators.required],
    address: ['', [Validators.required, Validators.pattern("^[a-zA-Z а-яА-Я0-9-\/\s]+$")]],
    zip: ['', Validators.required],
    comment: ['']

  });
  public formValues = {
    name: '',
    last_name: '',
    phone: '',
    country: '',
    zip: '',
    productTitle: '',//product
    address: '',
    comment: '',

  }

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute, private productService: ProductService,
              private orderService: OrderService,public modalService: ModalService,
              private router: Router) {

    this.modalObservable = new Observable((obs ) => {
      setTimeout(() => {
        obs.next();
      }, 3000);
    });
  }

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;


  ngOnInit(): void {
    this.modal = document.getElementById('modal');
    this.formOrder = document.getElementById('formOrder');
    this.errorOrder = document.getElementById('errorOrder');
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.formValues.productTitle = params['product'];
      } else {
        this.modalService.showModalAll(this.modal,'Товар не добавлен в корзину! Выберите сначала чай!');
      }
    });
    if (this.errorOrder) this.errorOrder.style.display = 'none';



  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
    console.log('unsubscribe: order');
  }
  /*hideModal(){
    if (this.modal) this.modal.style.display = 'none';
    this.router.navigate(['/']);

  }
  hideForm(){
    if (this.formOrder) this.formOrder.style.display = 'none';
    if (this.modal) this.modal.style.display = 'block';

  }*/


/*  hideModalAll(modalWindowName: string | null, flag: boolean) {
    if (modalWindowName === 'formOrder') {
      if (this.formOrder) {
        this.formOrder.style.display = 'none';
      }
    } else {
      if (modalWindowName === 'modal') {
        if (this.modal) {
          this.modal.style.display = 'none';
        }
      }
    }
    if (flag){this.router.navigate(['/'])};
  }
  showModalAll(modalName: HTMLElement | null, modalText: string | null){
    this.modalText = modalText;
    if (modalName) modalName.style.display = 'block';
  }
  */

  createOrder(): void {
    if (!this.formValues.productTitle) {
      this.modalService.showModalAll(this.modal,'Товар не добавлен в корзину! Выберите сначала чай!');
      return;
    }

    this.subscriptionOrder = this.orderService.sendOrder({
      //name: '',
      name: this.formValues.name,
      last_name: this.formValues.last_name,
      phone: this.formValues.phone,
      country: this.formValues.country,
      zip: this.formValues.zip,
      product: this.formValues.productTitle, // тк имя не совпадает
      address: this.formValues.address,
      comment: this.formValues.comment

    })
      .subscribe(
        {
          next: (response) => {
            if (response.success && !response.message) {
              this.modalService.hideModalAll('formOrder',false);
              this.modalService.showModalAll(this.modal,'Спасибо за заказ!');

              this.formValues = {
                name: '',
                last_name: '',
                phone: '',
                country: '',
                zip: '',
                productTitle: '',
                address: '',
                comment: ''
              }
            } else {
              if (this.errorOrder) this.errorOrder.style.display = 'block';
              this.modalService.showModalAll(this.modal,'Произошла ошибка. Попробуйте еще раз.');
              // this.hideModalAll('modal', true,);
              this.modalSubscription = this.modalObservable.subscribe((): void => {
                this.modalService.hideModalAll('modal',true );
                this.modalService.hideModalAll('formOrder',true );
              })
            }            // тут нужно добавить не только next. но и error!!!
          },
          error: (error) => {
            this.router.navigate(['/'])
          }
        });
  }
}
