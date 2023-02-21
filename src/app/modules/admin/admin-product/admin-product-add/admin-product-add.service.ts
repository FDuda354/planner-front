import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdminProductUpdate} from "../model/adminProductUpdate";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminProductAddService {

  constructor(private http: HttpClient) {
  }

  saveNewProduct(newProduct: AdminProductUpdate): Observable<AdminProductUpdate> {
    return this.http.post<AdminProductUpdate>("https://shopbackend.dudios.pl/admin/product", newProduct);
  }

}
