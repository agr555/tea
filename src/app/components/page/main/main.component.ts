import {Component, OnInit} from '@angular/core';
import {Observable, Subject, Subscriber, Subscription} from "rxjs";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private modalObservable: Observable<string>;// = null;
  private modalSubscription: Subscription | null = null;

  private modal: HTMLElement | null = null;

  constructor() {


    this.modalObservable = new Observable((obs) => {
      setTimeout(() => {
        obs.next();
      }, 10000);
    });
  }

  ngOnInit() {
    this.modal = document.getElementById('modal');
    this.modalSubscription = this.modalObservable.subscribe((): void => {
      this.showModal();
    })
  }

  hideModal() {
    if (this.modal) this.modal.style.display = 'none';
  }

  showModal() {
    if (this.modal) this.modal.style.display = 'block';
  }
}
