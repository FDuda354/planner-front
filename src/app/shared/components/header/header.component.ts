import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

import {JwtService} from "../../../modules/common/service/jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Planner';

  isLogged = false;

  constructor(
    private cookieService: CookieService,
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isLogged = this.jwtService.isLoggedIn();
  }


  logout() {
    this.jwtService.removeToken();
    this.isLogged = false;
    this.router.navigate(['/login']);
  }
}
