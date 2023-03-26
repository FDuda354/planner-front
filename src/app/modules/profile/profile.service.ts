import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
  ) {
  }


  changePassword(passwordObject: any): Observable<any> {
    return this.http.post("https://planerbackend.dudios.pl/profile/changePassword", passwordObject);
  }
}
