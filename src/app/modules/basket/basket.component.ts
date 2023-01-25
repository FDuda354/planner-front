import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BasketService} from "./basket.service";
import {BasketSummary} from "./model/basketSummary";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{

  basketSummary!: BasketSummary;
  constructor(
    private route: ActivatedRoute,
    private basketService: BasketService,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let productId = Number(this.route.snapshot.queryParams['productId']);
    if(productId > 0){
      this.addProductToBasket(productId);
    } else {
      this.getBasket();
    }
  }

  getBasket(){
    let basketId = Number(this.cookieService.get('basketId'));
    if(basketId > 0) {
      this.basketService.getBasket(basketId)
        .subscribe(summary => this.basketSummary = summary);
    }
  }


  private addProductToBasket(productId: number) {
    let basketId = Number(this.cookieService.get('basketId'));
    this.basketService.addProductToBasket(basketId, {productId: productId, quantity: 1})
      .subscribe(summary => {
        this.basketSummary = summary;
        this.cookieService.delete('basketId');
        this.cookieService.set('basketId', summary.id.toString(),this.expirationDate(3));
        this.router.navigate(['/basket']);
      });
  }

  private expirationDate(days: number) {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
}
