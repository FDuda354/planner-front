import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {JwtService} from "../service/jwt.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.jwtService.getToken();
    console.log(req.url);
    console.log("token before: " + token);
    if (token && (req.url.startsWith("/api/admin") || req.url.startsWith("api/order") || req.url.startsWith("/api/login"))) {
      console.log(req.url);
      console.log("token AAAAAAAAA: " + token);
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
    }
    return next.handle(req);
  }

}
