import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {UploadResponse} from "../../common/model/uploadResponse";
import {HttpClient} from "@angular/common/http";
import {UserProfileUpdate} from "./model/userProfileUpdate";

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(
    private http: HttpClient
  ) {
  }

  uploadImage(formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>("https://shopbackend.dudios.pl/profile/upload-image", formData);
  }

  updateProfileImage(value: UserProfileUpdate) {
    return this.http.put<UserProfileUpdate>("https://shopbackend.dudios.pl/profile/image", value);
  }

  changePassword(passwordObject: any): Observable<any> {
    return this.http.post("https://shopbackend.dudios.pl/profile/changePassword", passwordObject);
  }
}
