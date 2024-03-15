import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorterPipe'
})
export class ShorterPipePipe implements PipeTransform {

  transform(value: string): string {
    return (value.length >95) ?  (value.slice(0, 80) + '<...>') : value;
  }

}
