import {Component, OnInit} from '@angular/core';
import {Observable, Subject, Subscriber, Subscription} from "rxjs";
import {ModalService} from "../../../services/modal.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public modalText:string |null ='';
  private modalObservable: Observable<string>;// = null;
  private modalSubscription: Subscription | null = null;

  private modal: HTMLElement | null = null;

  constructor( private activatedRoute: ActivatedRoute,public modalService: ModalService, private router: Router) {


    this.modalObservable = new Observable((obs) => {
      setTimeout(() => {
        obs.next();
      }, 10000);
    });
  }

  ngOnInit() {
    this.modal = document.getElementById('modal');
    this.modalSubscription = this.modalObservable.subscribe((): void => {
      // this.showModal();
      this.modalService.showModalAll(this.modal,'Посмотрите наши чайные коллекции!');
    })
  }
  ngOnDestroy() {
    this.modalSubscription?.unsubscribe();
    console.log('unsubscribe: modal');
  }

/* hideModal() {
    if (this.modal) this.modal.style.display = 'none';
  }

  showModal() {
    if (this.modal) this.modal.style.display = 'block';
  }*/
}
