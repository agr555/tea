import {
  AfterViewInit,
  Component,
  ElementRef, inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {FormBuilder, NgForm, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../shared/services/order.service";
import {ProductService} from "../../shared/services/product.service";
import {PopupFullComponent} from "../../shared/components/popup-full/popup-full.component";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {PopupInfoComponent} from "../../shared/components/popup-info/popup-info.component";

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(PopupFullComponent)
  private popupFullComponent!: PopupFullComponent;

  @ViewChild(PopupInfoComponent)
  private popupInfoComponent!: PopupInfoComponent;

  @ViewChild('popup')
  popup!: TemplateRef<ElementRef>;

  @ViewChild('popupDataOk')
  popupDataOk!: TemplateRef<ElementRef>;
  @ViewChild('popupDataNull')
  popupDataNull!: TemplateRef<ElementRef>;
  @ViewChild('popupDataErr')
  popupDataErr!: TemplateRef<ElementRef>;

  @ViewChild('popupFull')
  popupFull!: TemplateRef<ElementRef>;

  @Input() dataOk: string = '';

  @ViewChild('popupInfo')
  popupInfo!: TemplateRef<ElementRef>;

  @Input() name: string = '';
  @Input() dataNull: string = '';
  @Input() dataErr: string = '';
  private modalService1 = inject(NgbModal);

  // private modal: HTMLElement| null = null;
  // private formOrder: HTMLElement| null = null;
  private errorOrder: HTMLElement | null = null;
  // private errorTitle: HTMLElement| null = null;
  private modalObservable: Observable<string>;// = null;
  private modalSubscription: Subscription | null = null;
  public modalText: string | null = '';
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

  constructor(config: NgbModalConfig,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute, private productService: ProductService,
              private orderService: OrderService, public modalService: NgbModal,
              private router: Router) {

    this.modalObservable = new Observable((obs) => {
      setTimeout(() => {
        obs.next();
      }, 3000);
    });
  }

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
    console.log('unsubscribe: order');
  }

  ngAfterViewInit(): void {
    this.modalService.open(this.popup, {})
    this.errorOrder = document.getElementById('errorOrder');
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if  (params['product']) {
        this.formValues.productTitle = params['product'];
      } else {
        const modalRef = this.modalService1.open(PopupInfoComponent);
        modalRef.componentInstance.name = 'Товар не добавлен в корзину! Выберите сначала чай!';
        modalRef.result.then(
          (reason) => {
            this.closeResult = `Dismissed ${reason}`;
            this.modalService.dismissAll();
            this.router.navigate(['/products']);
          },
        );
      }
    });
    if (this.errorOrder) this.errorOrder.style.display = 'none';
     }
  closeResult = '';

  createOrder(): void {
    if (!this.formValues.productTitle) {
      this.open(this.popupInfo, 'Товар не добавлен в корзину! Выберите сначала чай!')
      const modalRef = this.modalService1.open(PopupInfoComponent);
      modalRef.componentInstance.name = 'Товар не добавлен в корзину! Выберите сначала чай!';
      modalRef.result.then(
        (reason) => {
          this.closeResult = `Dismissed ${reason}`;
          this.modalService.dismissAll();
          this.router.navigate(['/']);
        },
      );

      return;
    }

    this.subscriptionOrder = this.orderService.sendOrder({
      name: '',
      // name: this.formValues.name,
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

              const modalRef = this.modalService1.open(PopupInfoComponent);
              modalRef.componentInstance.name = 'Спасибо за заказ!';
              modalRef.result.then(
                (reason) => {
                  this.closeResult = `Dismissed ${reason}`;
                  this.modalService.dismissAll();
                },
              );
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
              this.modalSubscription = this.modalObservable.subscribe((): void => {
                const modalRef = this.modalService1.open(PopupInfoComponent)
                modalRef.componentInstance.name = 'Произошла ошибка. Попробуйте еще раз.';




                console.log('no ok')
              })
            }
          },
          error: (error) => {
            this.router.navigate(['/'])
          }
        });
  }

  open(content: TemplateRef<any>, str: string) {
    console.log('open');
    const modalRef = this.modalService.open(this.popupInfo);
    modalRef.componentInstance.name = str;
    this.modalService.open(content, {size: 'sm'});
  }
}

