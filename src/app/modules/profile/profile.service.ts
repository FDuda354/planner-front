import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderDtoForUser} from "./model/OrderDtoForUser";
import {UserProfileUpdate} from "./edit-profile/model/userProfileUpdate";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
  ) { }

  getOrders(): Observable<Array<OrderDtoForUser>> {
    return this.http.get<Array<OrderDtoForUser>>("/api/orders");
  }

  getUserImage(userId: number): Observable<UserProfileUpdate> {
    return this.http.get<UserProfileUpdate>(`/api/profile/${userId}/image`);
  }
}
