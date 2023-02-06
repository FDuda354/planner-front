import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {JwtService} from "../service/jwt.service";

@Injectable()
export class ProfileAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.jwtService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return true;
  }
}
