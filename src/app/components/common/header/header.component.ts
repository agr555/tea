import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {FormsModule} from '@angular/forms';
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {FinderService} from "../../../services/finder.service";
import {Subject} from "rxjs";

// public findStr: Subject<string> = new Subject<string>();


@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  findStr: string = '';
  public userActivated: Subject<string> = new Subject<string>();

  inputStr1: HTMLInputElement | null = null;

  constructor(private productService: ProductService, private router: Router, public finderService: FinderService) {

  }

  ngOnInit(): void {

  }

  find() {
    //this.productService.setTitle('Результаты поиска по запросу:  ' + this.findStr);
    this.finderService.find1(this.findStr);
    // this.item.next(true);
    this.productService.userActivated.next(this.findStr);

  }

  cancel() {
    //this.productService.setTitle('Наши чайные коллекции');
    this.inputStr1 = (document.getElementById('findStr') as HTMLInputElement)//.value;
    if (this.inputStr1 && this.inputStr1.value !== '' && this.inputStr1.value !== null) {
      this.inputStr1.value = '';
      // this.findStr = '';
    }
    this.productService.userDeactivated.next(true);
    this.productService.getProducts();
  }
}
