import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from "./default.component";
import {HomeComponent} from "../../modules/home/home.component";
import {ProductComponent} from "../../modules/product/product.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";



@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
  ]
})
export class DefaultModule { }
