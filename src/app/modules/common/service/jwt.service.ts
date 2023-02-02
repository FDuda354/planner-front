import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  isAdmin = false;
  constructor() {
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    let token = this.getToken();
    return !!(token && this.notExpired(token));

  }

  private notExpired(token: string): boolean {
    let tokenDecoded = jwt_decode<any>(token);
    return new Date().getTime() < (tokenDecoded.exp * 1000);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  public getIsAdmin(): boolean {
    return this.isAdmin;
  }
  public setIsAdmin(isAdmin: boolean): void {
    this.isAdmin = isAdmin;
  }
}
