import {Component, OnInit} from '@angular/core';
import {ProductDetails} from "./model/productDetails";
import {ProductDetailsService} from "./product-details.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Review} from "./model/review";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private snackBar: MatSnackBar
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
}
