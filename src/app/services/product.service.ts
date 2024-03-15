import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../types/product.type";
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";

@Injectable(/*{
  providedIn: 'root'
}*/)
export class ProductService {

  constructor(private http: HttpClient) { }
  private products: ProductType[] = [];
  getProducts(): Observable<ProductType[]>{
  return this.http.get<ProductType[]>('https://testologia.site/tea');

}
getProduct(id: number): Observable<ProductType> {
  // return  this.products.find(item => (item.id === id));
  // return this.http.get<ProductType>(`https://testologia.site/order-tea?id=${id}`);
  return this.http.get<ProductType>(`https://testologia.site/tea?id=${id}`);
}
//создание заказа следует вынести в отдельный сервис!
sendOrder(data: { //product: string, address: string, phone: string
  name: string,  last_name: string,   phone: string,   country: string,   zip: string,
  product: string,  address: string,   comment: string

}) {

  return this.http.post<{ success: boolean, message?: string }>(`https://testologia.site/order-tea`, data);
}
}
