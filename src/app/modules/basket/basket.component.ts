import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BasketService} from "./basket.service";
import {BasketSummary} from "./model/basketSummary";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{

  basketSummary!: BasketSummary;
  constructor(
    private route: ActivatedRoute,
    private basketService: BasketService
  ) { }

  ngOnInit(): void {
    let productId = Number(this.route.snapshot.paramMap.get('productId'));
    if(productId > 0){
      this.addProductToBasket(productId);
    } else {
      this.getBasket();
    }
  }

  getBasket(){
    let basketId = 0;
    if(basketId > 0) {
      this.basketService.getBasket(0).subscribe(summary => this.basketSummary = summary);
    }

  }


  private addProductToBasket(productId: number) {

  }
}
