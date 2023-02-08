import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserProfileUpdate} from "./edit-profile/model/userProfileUpdate";
import {OrderDtoForUser} from "./model/OrderDtoForUser";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getOrders(): Observable<Array<OrderDtoForUser>> {
    return this.http.get<Array<OrderDtoForUser>>("https://shopbackend.dudios.pl/orders");
  }

  getUserImage(userId: number): Observable<UserProfileUpdate> {
    return this.http.get<UserProfileUpdate>(`https://shopbackend.dudios.pl/profile/${userId}/image`);
  }
}
