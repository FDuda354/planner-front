import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../common/model/page";
import {AdminProduct} from "./model/adminProduct";

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(page: number, size: number): Observable<Page<AdminProduct>> {
    return this.http.get<Page<AdminProduct>>(`https://shopbackend.dudios.pl/admin/products?page=${page}&size=${size}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`https://shopbackend.dudios.pl/admin/product/${id}`);
  }
}
