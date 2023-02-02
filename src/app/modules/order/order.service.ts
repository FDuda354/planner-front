import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BasketCommonService} from "../common/service/basket-common.service";
import {Observable} from "rxjs";
import {BasketSummary} from "../common/model/basket/basketSummary";
import {OrderSummary} from "./model/orderSummary";
import {OrderDto} from "./model/orderDto";
import {InitData} from "./model/initData";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private basketCommonService: BasketCommonService
  ) {
  }


  getBasket(basketId: number): Observable<BasketSummary> {
    return this.basketCommonService.getBasket(basketId);
  }

  makeOrder(order: OrderDto): Observable<OrderSummary> {
    return this.http.post<OrderSummary>("api/order", order);
  }

  getInitData(): Observable<InitData> {
    return this.http.get<InitData>("api/order/initOrder");
  }
}
