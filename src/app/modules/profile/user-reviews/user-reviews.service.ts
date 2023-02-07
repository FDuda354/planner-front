import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../../product-details/model/review";

@Injectable({
  providedIn: 'root'
})
export class UserReviewsService {

  constructor(
    private http: HttpClient

  ) { }

  getUserReviews(): Observable<Array<Review>> {
    return this.http.get<Array<Review>>('/api/reviews');
  }

  removeReview(id: number) {
    return this.http.delete(`/api/review/${id}`);
  }
}
