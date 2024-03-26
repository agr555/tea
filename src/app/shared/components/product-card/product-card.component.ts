import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {FinderService} from "../../services/finder.service";
import {ProductType} from "../../../../types/product.type";

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
