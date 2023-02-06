import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) {
  }

  register(registerForm: any): Observable<any> {
    return this.http.post('/api/register', registerForm);
  }

  login(loginForm: any): Observable<any> {
    return this.http.post('/api/login', loginForm);
  }
  resetPassword(emailObject: any): Observable<any>  {
    return this.http.post("/api/lostPassword", emailObject);
  }
  changePassword(passwordObject: any): Observable<any> {
    return this.http.post("/api/changePassword", passwordObject);
  }
}
