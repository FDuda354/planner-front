import {Component, OnInit} from '@angular/core';
import {ProductDetails} from "./model/productDetails";
import {ProductDetailsService} from "./product-details.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Review} from "./model/review";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BasketService} from "../basket/basket.service";
import {CookieService} from "ngx-cookie-service";
import {BasketIconService} from "../common/service/basket-icon.service";
import {ProfileService} from "../profile/profile.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productDetails!: ProductDetails;
  reviewForm!: FormGroup;

  constructor(
    private productDetailsService: ProductDetailsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private basketService: BasketService,
    private cookieService: CookieService,
    private basketIconService: BasketIconService,
    private profileService: ProfileService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getProductDetails();
    this.reviewForm = this.formBuilder.group({
      authorName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      content: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(600)]]
    });
  }

  getProductDetails() {
    let slug = this.route.snapshot.params['slug'];
    this.productDetailsService.getProductDetails(slug)
      .subscribe(productDetails => this.productDetails = productDetails);
  }

  submit() {
    if (this.reviewForm.valid) {
      this.productDetailsService.addReview(
        {
          authorName: this.reviewForm.get('authorName')?.value,
          content: this.reviewForm.get('content')?.value,
          productId: this.productDetails.id
        } as Review)
        .subscribe(review => {
          this.snackBar.open('Review added', 'OK', {duration: 3000, panelClass: "snack-bar-bg-color-ok"});
          this.reviewForm.reset();
          this.getProductDetails();
          console.log(this.productDetails.reviews)
        })
    }
  }

  get authorName() {
    return this.reviewForm.get('authorName');
  }

  get content() {
    return this.reviewForm.get('content');
  }

  addProduct(id: number) {
    let basketId = Number(this.cookieService.get('basketId'));
    this.basketService.addProductToBasket(basketId, {productId: id, quantity: 1})
      .subscribe(summary => {
        this.basketIconService.setBasketIconCount(summary.items.length);
        this.cookieService.delete('basketId');
        this.cookieService.set('basketId', summary.id.toString(), this.expirationDate(3));
      });
    this.router.navigate(['/products']);
  }

  private expirationDate(days: number) {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  private cache = new Map<number, string>();

  getUserImage(userId: number): string {
    if (this.cache.has(userId)) {
      return this.cache.get(userId)!;
    }

    let profileImage: string = '';
    this.profileService.getUserImage(userId)
      .subscribe(userProfileUpdate => {
        if (userProfileUpdate == null || userProfileUpdate.image == null || userProfileUpdate.image == '') {
          profileImage = 'avatar.gif';
        } else {
          profileImage = userProfileUpdate.image;
        }
        this.cache.set(userId, profileImage);
      });

    return profileImage;
  }
}
