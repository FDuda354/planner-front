import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserEvent} from "./model/userEvent";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) {
  }

  getEvents(): Observable<UserEvent[]> {
    return this.http.get<UserEvent[]>('https://planerbackend.dudios.pl/events');

  }

  addEvent(result: UserEvent): Observable<UserEvent> {
    return this.http.post<UserEvent>('https://planerbackend.dudios.pl/event', result);

  }

  deleteEvent(eventId: number) {
    return this.http.delete(`https://planerbackend.dudios.pl/event/${eventId}`);
  }

  updateEvent(result: UserEvent): Observable<UserEvent>  {
    return this.http.put<UserEvent>(`https://planerbackend.dudios.pl/event`, result);
  }
}
