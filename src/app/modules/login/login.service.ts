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
    return this.http.post('https://shopbackend.dudios.pl/register', registerForm);
  }

  login(loginForm: any): Observable<any> {
    return this.http.post('https://shopbackend.dudios.pl/login', loginForm);
  }

  resetPassword(emailObject: any): Observable<any> {
    return this.http.post("https://shopbackend.dudios.pl/lostPassword", emailObject);
  }

  changePassword(passwordObject: any): Observable<any> {
    return this.http.post("https://shopbackend.dudios.pl/changePassword", passwordObject);
  }
}
