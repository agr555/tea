import {Component,  OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {FinderService} from "../../../services/finder.service";
import {Subject} from "rxjs";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  findStr: string = '';
  isCollapsed = false;
  public userActivated: Subject<string> = new Subject<string>();

  inputStr1: HTMLInputElement | null = null;

  constructor(private productService: ProductService, private router: Router, public finderService: FinderService) {

  }

  ngOnInit(): void {

  }

  find() {
    this.finderService.find1(this.findStr);
    this.productService.userActivated.next(this.findStr);

  }

  cancel() {
    this.inputStr1 = (document.getElementById('findStr') as HTMLInputElement)//.value;
    if (this.inputStr1 && this.inputStr1.value !== '' && this.inputStr1.value !== null) {
      this.inputStr1.value = '';
    }
    this.productService.userDeactivated.next(true);
    this.productService.getProducts();
  }
}
