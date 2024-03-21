import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscriber, Subscription} from "rxjs";
import {ModalService} from "../../../services/modal.service";
declare var $: any;
@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private modalObservable: Observable<string>;// = null;
  private modalSubscription: Subscription | null = null;

  private modal: HTMLElement | null = null;

  constructor(public modalService: ModalService) {
    this.modalObservable = new Observable((obs) => {
      setTimeout(() => {
        obs.next();
      }, 10000);
    });
  }
  ngOnInit() {
    this.modal = document.getElementById('modal');
    this.modalSubscription = this.modalObservable.subscribe((): void => {
      this.modalService.showModalAll(this.modal, 'Посмотрите наши чайные коллекции!');
      // $("#accordion").accordion();
    })
  }

  ngOnDestroy() {
    this.modalSubscription?.unsubscribe();
    console.log('unsubscribe: modal');
  }

}
