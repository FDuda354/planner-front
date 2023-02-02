import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getBasketProductsCount(basketId: number): Observable<Number> {
    return this.http.get<Number>("/api/basketItems/counter/" + basketId);
  }
}
