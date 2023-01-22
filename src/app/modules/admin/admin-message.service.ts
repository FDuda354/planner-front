import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminMessageService {

  messages: Array<string> = [];
  subject = new Subject<Array<string>>();
  constructor() { }

  add(message: string): void {
    this.clear();
    this.messages.push(message);
    this.subject.next(this.messages);
  }

  clear() {
    this.messages = [];
  }

  addSpringErrors(error: any): void {
    this.clear();
    if (error.errors?.length > 0) {
      for (let field in error.errors) {
        this.messages.push(error.errors[field].field +" -> "+error.errors[field].defaultMessage);
      }
    } else {
      this.messages.push(error.message);
    }
    this.messages.sort();
    this.subject.next(this.messages);
  }
}
