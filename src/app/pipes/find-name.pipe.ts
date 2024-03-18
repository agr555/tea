import { Pipe, PipeTransform } from '@angular/core';
import {ProductType} from "../types/product.type";

@Pipe({
  name: 'findName'
})
export class FindNamePipe implements PipeTransform {
  private findStr: HTMLElement| null = null;

  transform(products: ProductType[]): ProductType[] {


    let findStr;
    if (document.getElementById('findStr')) {
      findStr = document.getElementById('findStr')?.innerHTML;
      console.log(findStr);
    }

    return products.filter(item => item.title.toLowerCase().includes(('ый')));
  }
}
