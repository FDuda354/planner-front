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
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getProductDetails();
    this.reviewForm = this.formBuilder.group({
      authorName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      content: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(600)]]
    });
    console.log(this.productDetails.reviews)
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

//TODO: usunac jak beda problemy i dodawac przez link {
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

//TODO: }
}
