import {Component, OnInit} from '@angular/core';
import {UserReviewsService} from "./user-reviews.service";
import {JwtService} from "../../common/service/jwt.service";
import {Review} from "../../product-details/model/review";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {

  reviews!: Array<Review>;
  constructor(
    private userReviewsService: UserReviewsService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.getUserReviews();
  }

  getUserReviews() {
    this.userReviewsService.getUserReviews().subscribe(reviews => this.reviews = reviews);
  }

  removeReview(id: number) {
    this.userReviewsService.removeReview(id).subscribe(() => this.getUserReviews());
  }

  private cache = new Map<number, string>();
  getUserImage(userId: number): string {
    if (this.cache.has(userId)) {
      return this.cache.get(userId)!;
    }

    let profileImage: string = '';
    this.profileService.getUserImage(userId)
      .subscribe(userProfileUpdate => {
        if(userProfileUpdate == null || userProfileUpdate.image == null || userProfileUpdate.image == ''){
          profileImage = 'avatar.gif';} else {
          profileImage = userProfileUpdate.image;}
        this.cache.set(userId, profileImage);
      });

    return profileImage;
  }
}
