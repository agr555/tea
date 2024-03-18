import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {ProductType} from "../types/product.type";

@Directive({
  selector: '[findName]'
})
export class FindNameDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
  }

  @Input()
      isFindString: string = '';

  ngOnInit() {
    if (this.isFindString.toLowerCase().includes('сыр')) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
