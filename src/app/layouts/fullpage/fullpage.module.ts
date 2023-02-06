import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullpageComponent} from "./fullpage.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../../shared/shared.module";
import {LoginComponent} from "../../modules/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {LostPasswordComponent} from "../../modules/login/lost-password/lost-password.component";

@NgModule({
  declarations: [
    FullpageComponent,
    LoginComponent,
    LostPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FullpageModule {
}
