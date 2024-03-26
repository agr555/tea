import {Component, ElementRef, inject, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-popup-info',
  templateUrl: './popup-info.component.html',
  styleUrls: ['./popup-info.component.scss']
})
export class PopupInfoComponent {
  @ViewChild('popupInfo')
  popupInfo!: TemplateRef<ElementRef>;
  @Input() data:string = ''
  @Input() name: string = '';
  activeModal = inject(NgbActiveModal);
  constructor(private modalService: NgbModal) {
  }

 /* open(): void {
    this.modalService.open(this.popupInfo);
  }
  close(): void {
    this.modalService.dismissAll(this.popupInfo);
  }*/

  // activeModal = inject(NgbActiveModal);


  // @Input() data: string = '';
}
