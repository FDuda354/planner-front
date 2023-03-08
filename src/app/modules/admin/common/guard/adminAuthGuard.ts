import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {JwtService} from "../../../common/service/jwt.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (!this.jwtService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return true;
  }
}
