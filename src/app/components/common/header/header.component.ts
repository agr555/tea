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
  // public findStr: Subject<string> = new Subject<string>();
  inputStr: string | null = '';
  inputStr1: HTMLInputElement | null = null;
  constructor(private productService: ProductService, private router: Router, public finderService: FinderService) {
  }

  ngOnInit(): void {
  }

  find() {
    this.finderService.find1(this.findStr);
    console.log(this.findStr)
  }
  cancel() {
    // this.finderService.find1('');
    this.inputStr1 = (document.getElementById('findStr') as HTMLInputElement)//.value;
    //console.log((document.getElementById('findStr') as HTMLInputElement).value);
    this.inputStr1.value = '';
    this.findStr='';
      // console.log(this.inputStr1);
      this.productService.getProducts();
    }

}
