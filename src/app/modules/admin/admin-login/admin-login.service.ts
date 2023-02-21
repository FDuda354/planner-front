import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(
    private http: HttpClient,
  ) {
  }

  login(credentials: any): Observable<any> {
    return this.http.post('https://shopbackend.dudios.pl/login', credentials);
  }
}
