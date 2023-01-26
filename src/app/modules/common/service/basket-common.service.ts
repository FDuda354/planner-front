import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BasketSummary} from "../model/basket/basketSummary";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BasketCommonService {

  constructor(
    private http: HttpClient,
  ) { }

  getBasket(id: number): Observable<BasketSummary>{
    return this.http.get<BasketSummary>("/api/basket/"+id);
  }
}
