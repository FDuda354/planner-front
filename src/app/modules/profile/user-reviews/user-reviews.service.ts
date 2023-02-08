import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../../product-details/model/review";

@Injectable({
  providedIn: 'root'
})
export class UserReviewsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getUserReviews(): Observable<Array<Review>> {
    return this.http.get<Array<Review>>('https://shopbackend.dudios.pl/reviews');
  }

  removeReview(id: number) {
    return this.http.delete(`https://shopbackend.dudios.pl/review/${id}`);
  }
}
