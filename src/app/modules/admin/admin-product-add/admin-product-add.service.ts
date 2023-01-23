import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdminProductUpdate} from "../admin-product-update/model/adminProductUpdate";
import {Observable} from "rxjs";
import {UploadResponse} from "../admin-product-update/model/uploadResponse";

@Injectable({
  providedIn: 'root'
})
export class AdminProductAddService {

  constructor(private http: HttpClient) { }

  saveNewProduct(newProduct: AdminProductUpdate):Observable<AdminProductUpdate> {
    return this.http.post<AdminProductUpdate>("/api/admin/product", newProduct);
  }

  uploadImage(formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>("/api/admin/product/upload-image", formData);
  }
}
