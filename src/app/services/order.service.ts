import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable(/*{
  providedIn: 'root'
}*/)
export class OrderService {

  constructor(private http: HttpClient) { }
  //создание заказа следует вынести в отдельный сервис!
  sendOrder(data: { //product: string, address: string, phone: string
    name: string, last_name: string, phone: string, country: string, zip: string,
    product: string, address: string, comment: string
  }) {
    return this.http.post<{ success: boolean, message?: string }>(`https://testologia.site/order-tea`, data);
  }

}
