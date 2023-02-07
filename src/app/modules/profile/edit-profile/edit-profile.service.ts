import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UploadResponse} from "../../common/model/uploadResponse";
import {HttpClient} from "@angular/common/http";
import {AdminProductUpdate} from "../../admin/admin-product/model/adminProductUpdate";
import {UserProfileUpdate} from "./model/userProfileUpdate";

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(
    private http: HttpClient
  ) { }

  uploadImage(formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>("/api/profile/upload-image", formData);
  }

  updateProfileImage(value: UserProfileUpdate) {
    return this.http.put<UserProfileUpdate>("/api/profile/image", value);
  }

  changePassword(passwordObject: any): Observable<any> {
    return this.http.post("/api/profile/changePassword", passwordObject);
  }
}
