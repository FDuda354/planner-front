import {Injectable} from '@angular/core';
import {Product} from "../common/model/product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../common/model/page";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(page: number, size: number): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(`https://shopbackend.dudios.pl/products?page=${page}&size=${size}`);
  }
}
