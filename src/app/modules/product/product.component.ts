import { Component } from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "./model/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
     this.products = this.productService.getProducts();
  }

}
