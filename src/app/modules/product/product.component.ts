import {Component, OnInit} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "../common/model/product";
import {Page} from "../common/model/page";
import {PageEvent} from "@angular/material/paginator";
import {BasketService} from "../basket/basket.service";
import {CookieService} from "ngx-cookie-service";
import {BasketIconService} from "../common/service/basket-icon.service";
import {BasketComponent} from "../basket/basket.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  page!: Page<Product>;

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private cookieService: CookieService,
    private basketIconService: BasketIconService
    ) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.getProductPage(0, 5);
  }

  onPageEvent(event: PageEvent) {
    this.getProductPage(event.pageIndex, event.pageSize);
  }

  private getProductPage(page: number, size: number) {
    this.productService.getProducts(page, size).subscribe(data => {
      this.page = data;
    });
  }
//TODO: usunac jak beda problemy i dodawac przez link {
  addProduct(id: number) {
    let basketId = Number(this.cookieService.get('basketId'));
    this.basketService.addProductToBasket(basketId, {productId: id, quantity: 1})
      .subscribe(summary => {
        this.basketIconService.setBasketIconCount(summary.items.length);
        this.cookieService.delete('basketId');
        this.cookieService.set('basketId', summary.id.toString(),this.expirationDate(3));
      });
  }

  private expirationDate(days: number) {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
//TODO: }
}
