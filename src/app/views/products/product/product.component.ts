import {Component, ElementRef, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../../types/product.type";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: ProductType;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
              private router: Router, public modalService: NgbModal) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',

    }
  }

  private subscription: Subscription | null = null;
  private subscriptionFind: Subscription | null = null;
  private findStr: HTMLElement | null = null;

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productService.getProduct(+params['id'])
          .subscribe({
            next: (data) => {
              this.product = data;
              console.log(data)
            },
            error: (error) => {
              this.router.navigate(['/'])
            }
          });
      }

    });


  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    console.log('unsubscript: product');

  }


}
