import {Component, OnInit} from '@angular/core';
import {ProfileService} from "./profile.service";
import {OrderDtoForUser} from "./model/OrderDtoForUser";
import {JwtService} from "../common/service/jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  orders!: Array<OrderDtoForUser>;
  displayedColumns = ['id', 'placeDate', 'status', 'grossValue', 'paymentName'];
  constructor(
    private profileService: ProfileService,
    private jwtService: JwtService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    if (!this.jwtService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.getOrders();
  }
  getOrders() {
    this.profileService.getOrders().subscribe(
      orders => {
        this.orders = orders;
      }
    );
  }


}
