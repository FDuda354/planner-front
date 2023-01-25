import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BasketSummary} from "./model/basketSummary";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    private http: HttpClient,
  ) { }

  getBasket(id: number): Observable<BasketSummary>{
    return this.http.get<BasketSummary>("/api/basket/"+id);
  }

  addProductToBasket(basketId: number, basketItem: any): Observable<BasketSummary>{
    return this.http.put<BasketSummary>("/api/basket/"+basketId, basketItem);
  }

  updateBasket(basketId: number, items: any[]): Observable<BasketSummary>{
    return this.http.put<BasketSummary>("/api/basket/"+basketId+"/update", items);
  }

  removeBasketItem(id: any): Observable<void> {
    return this.http.delete<void>("/api/basketItems/"+id);
  }
}
