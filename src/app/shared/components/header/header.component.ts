import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HeaderService} from "./header.service";
import {BasketIconService} from "../../../modules/common/service/basket-icon.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private headerService: HeaderService,
    private basketIconService: BasketIconService,
  ) {
  }

  ngOnInit(): void {
    this.getBasketProductsCount();
    this.basketIconService.subject.subscribe(count => {
      this.basketProductsCount = String(count > 0 ? count : "");
    });
  }

  title = 'Shop';
  basketProductsCount = "";

  getBasketProductsCount() {
    let basketId = Number(this.cookieService.get('basketId'));
    this.headerService.getBasketProductsCount(basketId).subscribe(counter => {
      this.basketProductsCount = String(counter > 0 ? counter : "");
    });
  }


}
