import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultComponent} from "./default.component";
import {HomeComponent} from "../../modules/home/home.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../../shared/shared.module";

import {ReactiveFormsModule} from "@angular/forms";

import {ReplacePipe} from "../../modules/common/pipe/preplacePipe";
import {CalendarComponent} from "../../modules/calendar/calendar.component";
import {TodolistComponent} from "../../modules/todolist/todolist.component";
import {InvoiceComponent} from "../../modules/invoice/invoice.component";
import {ProfileComponent} from "../../modules/profile/profile.component";


@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ReplacePipe,
    CalendarComponent,
    TodolistComponent,
    InvoiceComponent,
    ProfileComponent,
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
