import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HeaderService} from "./header.service";
import {BasketIconService} from "../../../modules/common/service/basket-icon.service";
import {JwtService} from "../../../modules/common/service/jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Shop';
  basketProductsCount = "";
  isLogged = false;

  constructor(
    private cookieService: CookieService,
    private headerService: HeaderService,
    private basketIconService: BasketIconService,
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getBasketProductsCount();
    this.basketIconService.subject.subscribe(count => {
      this.basketProductsCount = String(count > 0 ? count : "");
    });
    this.isLogged = this.jwtService.isLoggedIn();
  }

  getBasketProductsCount() {
    let basketId = Number(this.cookieService.get('basketId'));
    this.headerService.getBasketProductsCount(basketId).subscribe(counter => {
      this.basketProductsCount = String(counter > 0 ? counter : "");
    });
  }


  logout() {
    this.jwtService.removeToken();
    this.isLogged = false;
    this.router.navigate(['/login']);
  }
}
