import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../common/model/page';
import { AdminOrder } from './model/adminOrder';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {

  constructor(private http: HttpClient) { }

  getOrders(pageIndex: number, pageSize: number): Observable<Page<AdminOrder>> {
    return this.http.get<Page<AdminOrder>>(`/api/admin/orders?page=${pageIndex}&size=${pageSize}`);
  }

  getOrder(id: number): Observable<AdminOrder> {
    return this.http.get<AdminOrder>("/api/admin/order/" + id);
  }

  changeStatus(id: number, order: AdminOrder): Observable<void> {
    return this.http.patch<void>("/api/admin/order/" + id, order);
  }

  getInitData(): Observable<any>{
    return this.http.get<any>("/api/admin/orders/initData");
  }
}
