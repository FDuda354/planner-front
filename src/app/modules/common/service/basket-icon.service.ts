import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BasketIconService {

  subject: Subject<Number> = new Subject();
  constructor() { }

  setBasketIconCount(count: Number) {
    this.subject.next(count);
  }
}
