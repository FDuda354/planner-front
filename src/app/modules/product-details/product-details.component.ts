import {Component, OnInit} from '@angular/core';
import {ProductDetails} from "./model/productDetails";
import {ProductDetailsService} from "./product-details.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productDetails!: ProductDetails;

  constructor(
    private productDetailsService: ProductDetailsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    let slug = this.route.snapshot.params['slug'];
    this.productDetailsService.getProductDetails(slug)
      .subscribe(productDetails => this.productDetails = productDetails);
  }

}
