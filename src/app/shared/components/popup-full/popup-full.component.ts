import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-popup-full',
  templateUrl: './popup-full.component.html',
  styleUrls: ['./popup-full.component.scss']
})
export class PopupFullComponent implements OnInit {
  @ViewChild('popupFull')
  popupFull!: TemplateRef<ElementRef>;

  @Input() data:string = ''  ;
  @Input() dataOk:string = ''  ;
  @Input() dataErr:string = ''  ;
  @Input() dataNull:string = ''  ;
  constructor(private modalService: NgbModal) {
  }
  ngOnInit(): void {
  }
  open(): void {
    this.modalService.open(this.popupFull);
  }
  close(): void {
    this.modalService.dismissAll(this.popupFull);
  }
}
