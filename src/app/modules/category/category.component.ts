import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from "./category.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";
import {CategoryProducts} from "./model/categoryProducts";
import {PageEvent} from "@angular/material/paginator";
import {BasketService} from "../basket/basket.service";
import {CookieService} from "ngx-cookie-service";
import {BasketIconService} from "../common/service/basket-icon.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  categoryProducts!: CategoryProducts;
  private subscribe!: Subscription;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private basketService: BasketService,
    private cookieService: CookieService,
    private basketIconService: BasketIconService
  ) {
  }

  ngOnInit() {
    this.subscribe = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.getProductsInCategory(0, 10));

    this.getProductsInCategory(0, 10);
  }

  ngOnDestroy(): void {
    //trzeba sie odsubskrybowac z rutera
    this.subscribe.unsubscribe();
  }

  getProductsInCategory(page: number, size: number) {
    let slug = this.route.snapshot.params['slug'];
    this.categoryService.getProductsInCategory(slug, page, size).subscribe(
      categoryProducts => {
        this.categoryProducts = categoryProducts;
      }
    );
  }


  onPageEvent(event: PageEvent) {
    this.getProductsInCategory(event.pageIndex, event.pageSize);
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


