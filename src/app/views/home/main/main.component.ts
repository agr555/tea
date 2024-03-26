import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Observable, Subject, Subscriber, Subscription} from "rxjs";
import {PopupFullComponent} from "../../../shared/components/popup-full/popup-full.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

declare var $: any;

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  private modalObservable: Observable<string>;// = null;
  private modalSubscription: Subscription | null = null;

  @ViewChild(PopupFullComponent)
  private popupFullComponent!: PopupFullComponent;


  constructor(public modalService: NgbModal) {
    this.modalObservable = new Observable((obs) => {
      setTimeout(() => {
        obs.next();
      }, 10000);
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.modalSubscription?.unsubscribe();
    console.log('unsubscribe: modal');
  }

  ngAfterViewInit(): void {
    this.modalSubscription = this.modalObservable.subscribe((): void => {
      this.popupFullComponent.open();
    })
  }
}
