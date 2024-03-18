import {Component, Input, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {FinderService} from "../../../services/finder.service";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: ProductType;
  constructor(public finderService: FinderService,private productService: ProductService,) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    }
  }

  ngOnInit(): void {
  }

}
