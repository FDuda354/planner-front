import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AdminCategoryNameDto} from "../common/dto/adminCategoryNamesDto";
import {HttpClient} from "@angular/common/http";
import {AdminCategory} from "./model/adminCategory";

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Array<AdminCategoryNameDto>> {
    return this.http.get<Array<AdminCategoryNameDto>>('https://shopbackend.dudios.pl/admin/categories');
  }

  addCategory(newCategory: any): Observable<AdminCategory> {
    return this.http.post<AdminCategory>('https://shopbackend.dudios.pl/admin/category', newCategory);
  }

  updateCategory(id: number, newCategory: any): Observable<AdminCategory> {
    return this.http.put<AdminCategory>('https://shopbackend.dudios.pl/admin/category/' + id, newCategory);
  }

  getCategory(id: number) {
    return this.http.get<AdminCategory>('https://shopbackend.dudios.pl/admin/category/' + id);
  }

  deleteProduct(id: any) {
    return this.http.delete('https://shopbackend.dudios.pl/admin/category/' + id);
  }
}
