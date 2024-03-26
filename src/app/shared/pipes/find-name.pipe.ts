import {Pipe, PipeTransform} from '@angular/core';
import {ProductType} from "../../../types/product.type";

@Pipe({
  name: 'findName'
})
export class FindNamePipe implements PipeTransform {
  private findStr: HTMLElement | null = null;
  inputStr: string = '';

  transform(products: ProductType[]): ProductType[] {
    this.inputStr = (document.getElementById('findStr') as HTMLInputElement).value.toLowerCase();
    console.log(this.inputStr);
    if (this.inputStr) {
      console.log(products.filter(item => item.title.toLowerCase().includes(this.inputStr)));
      // location. reload()
      return products.filter(item => item.title.toLowerCase().includes(this.inputStr))
    } else {
      console.log(products);
      return products;
    }
  }
}

