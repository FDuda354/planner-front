import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultComponent} from "./default.component";
import {HomeComponent} from "../../modules/home/home.component";
import {ProductComponent} from "../../modules/product/product.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../../shared/shared.module";
import {ProductDetailsComponent} from "../../modules/product-details/product-details.component";
import {CategoryComponent} from "../../modules/category/category.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BasketComponent} from "../../modules/basket/basket.component";
import {OrderComponent} from "../../modules/order/order.component";
import {ReplacePipe} from "../../modules/common/pipe/preplacePipe";
import {ProfileComponent} from "../../modules/profile/profile.component";
import {OrderNotificationComponent} from "../../modules/order/order-notification/order-notification.component";


@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailsComponent,
    CategoryComponent,
    BasketComponent,
    OrderComponent,
    ReplacePipe,
    ProfileComponent,
    OrderNotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DefaultModule {
}
