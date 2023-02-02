import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BasketSummary} from "../common/model/basket/basketSummary";
import {BasketCommonService} from "../common/service/basket-common.service";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    private http: HttpClient,
    private basketCommonService: BasketCommonService,
  ) {
  }

  getBasket(id: number): Observable<BasketSummary> {
    return this.basketCommonService.getBasket(id);
  }

  addProductToBasket(basketId: number, basketItem: any): Observable<BasketSummary> {
    return this.http.put<BasketSummary>("/api/basket/" + basketId, basketItem);
  }

  updateBasket(basketId: number, items: any[]): Observable<BasketSummary> {
    return this.http.put<BasketSummary>("/api/basket/" + basketId + "/update", items);
  }

  removeBasketItem(id: any): Observable<void> {
    return this.http.delete<void>("/api/basketItems/" + id);
  }
}
