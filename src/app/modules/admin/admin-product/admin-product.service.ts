import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../../shared/model/page";
import {AdminProduct} from "./adminProduct";

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(page: number, size: number): Observable<Page<AdminProduct>> {
    return this.http.get<Page<AdminProduct>>(`/api/admin/products?page=${page}&size=${size}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`/api/admin/product/${id}`);
  }
}
