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
    return this.http.get<UserEvent[]>('/api/events');

  }

  addEvent(result: UserEvent): Observable<UserEvent> {
    return this.http.post<UserEvent>('/api/event', result);

  }

  deleteEvent(eventId: number) {
    return this.http.delete(`/api/event/${eventId}`);
  }
}
