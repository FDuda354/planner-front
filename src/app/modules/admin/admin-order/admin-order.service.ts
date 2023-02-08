import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../../common/model/page';
import {AdminOrder} from './model/adminOrder';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {

  constructor(private http: HttpClient) {
  }

  getOrders(pageIndex: number, pageSize: number): Observable<Page<AdminOrder>> {
    return this.http.get<Page<AdminOrder>>(`https://shopbackend.dudios.pl/admin/orders?page=${pageIndex}&size=${pageSize}`);
  }

  getOrder(id: number): Observable<AdminOrder> {
    return this.http.get<AdminOrder>("https://shopbackend.dudios.pl/admin/order/" + id);
  }

  changeStatus(id: number, order: AdminOrder): Observable<void> {
    return this.http.patch<void>("https://shopbackend.dudios.pl/admin/order/" + id, order);
  }

  getInitData(): Observable<any> {
    return this.http.get<any>("https://shopbackend.dudios.pl/admin/orders/initData");
  }

  exportOrders(from: string, to: string, orderStatus: string): Observable<any> {
    return this.http.get(`https://shopbackend.dudios.pl/admin/orders/export?from=${from}&to=${to}&orderStatus=${orderStatus}`,
      {responseType: 'blob', observe: 'response'}
    );
  }

  getSalesStats(): Observable<any> {
    return this.http.get(`https://shopbackend.dudios.pl/admin/orders/stats`);
  }
}
