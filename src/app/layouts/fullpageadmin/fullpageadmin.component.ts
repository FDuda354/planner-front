import {Component} from '@angular/core';
import {JwtService} from "../../modules/common/service/jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fullpageadmin',
  templateUrl: './fullpageadmin.component.html',
  styleUrls: ['./fullpageadmin.component.css']
})
export class FullpageadminComponent {

  constructor(
    private router: Router,
    private jwtService: JwtService,
  ) {
  }

  logout() {
    this.jwtService.removeToken();
    this.router.navigate(['/admin/login']);
  }
}
