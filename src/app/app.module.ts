import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule }  from './app-routing.module';
import {DefaultModule} from "./layouts/default/default.module";
import {FullpageModule} from "./layouts/fullpage/fullpage.module";
import {FullpageadminModule} from "./layouts/fullpageadmin/fullpageadmin.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
