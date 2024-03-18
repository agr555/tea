import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {FormsModule} from '@angular/forms';
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {FinderService} from "../../../services/finder.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private findStr: HTMLElement | null = null;

  constructor(private productService: ProductService, private router: Router, public finderService: FinderService) {
  }

  ngOnInit(): void {
    this.findStr = document.getElementById('findStr');
  }

  filterResults(text: string) {
    if (!text) {
      //   this.filteredLocationList = this.housingLocationList;
    }
    console.log('!!!' + text);
    //  this.filteredLocationList = this.housingLocationList.filter(
    //    housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    //  );
  }

  find() {
    this.finderService.find1();
  }

}
