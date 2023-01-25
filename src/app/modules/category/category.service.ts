import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CategoryProducts} from "./model/categoryProducts";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getProductsInCategory(slug: string, page: number, size: number): Observable<CategoryProducts> {
    return this.http.get<CategoryProducts>(`/api/category/${slug}/products?page=${page}&size=${size}`);
  }
}
