import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, NgForm, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";


@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {


  checkoutForm = this.fb.group({
    product: ['', Validators.required],
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

  constructor(private fb: FormBuilder, //private cartService: CartService,
              private activatedRoute: ActivatedRoute, private productService: ProductService,
              private router: Router) {
  }

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  ngOnInit(): void {

    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.formValues.productTitle = params['product'];
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
    console.log('unsubscript: order');
  }

  createOrder(): void {
    if (!this.formValues.productTitle) {
      alert("Выберите сначала чай!");
      return;
    }
   /* if (siForm.valid) {
      console.log('OK');
    } else {
      console.log('invalid');
    }*/
    this.subscriptionOrder = this.productService.sendOrder({
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
              alert('Спасибо за заказ!');

              this.formValues = {
                name: '',
                // name: this.formValues.productTitle, // тк имя не совпадает
                last_name: '',
                phone: '',
                country: '',
                zip: '',
                productTitle: '',
                address: '',
                comment: ''
              }
              this.router.navigate(['/order-finish']);
            } else {
              alert('Error!')
            }            // тут нужно добавить не только next. но и error!!!
          },
          error: (error) => {
            this.router.navigate(['/'])
          }
        });
  }
}
