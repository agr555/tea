import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "./product.service";
import {OrderService} from "./order.service";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modal: HTMLElement | null = null;
  private formOrder: HTMLElement | null = null;
  public modalText: string | null = '';

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
              private orderService: OrderService,//private modalService: ModalService,
              private router: Router) {
  }

  hideModalAll(modalWindowName: string | null, flag: boolean) {
    if (modalWindowName) {
      this.modal = document.getElementById(modalWindowName);
      if (this.modal)
        this.modal.style.display = 'none';
    }
    if (flag) this.router.navigate(['/']);
  }

  showModalAll(modalName: HTMLElement | null, modalText: string | null) {
    this.modalText = modalText;
    console.log(modalText);
    console.log(this.modalText);
    if (modalName) modalName.style.display = 'block';
  }
}
