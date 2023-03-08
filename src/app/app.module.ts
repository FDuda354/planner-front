import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DefaultModule} from "./layouts/default/default.module";
import {FullpageModule} from "./layouts/fullpage/fullpage.module";
import {FullpageadminModule} from "./layouts/fullpageadmin/fullpageadmin.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {FullpageadminemptyModule} from "./layouts/fullpageadminempty/fullpageadminempty.module";
import {JwtInterceptor} from "./modules/common/interceptor/jwtInterceptor";
import {AdminAuthGuard} from "./modules/admin/common/guard/adminAuthGuard";
import {ProfileAuthGuard} from "./modules/common/guard/profileAuthGuard";
import {FullpageuserModule} from "./layouts/fullpageuser/fullpageuser.module";
import { ProfileComponent } from './modules/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    FullpageModule,
    FullpageadminModule,
    FullpageadminemptyModule,
    FullpageuserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    AdminAuthGuard,
    ProfileAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
