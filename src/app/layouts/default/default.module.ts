import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultComponent} from "./default.component";
import {HomeComponent} from "../../modules/home/home.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../../shared/shared.module";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {ReplacePipe} from "../../modules/common/pipe/preplacePipe";
import {CalendarComponent} from "../../modules/calendar/calendar.component";
import {TodolistComponent} from "../../modules/todolist/todolist.component";
import {InvoiceComponent} from "../../modules/invoice/invoice.component";
import {ProfileComponent} from "../../modules/profile/profile.component";
import {MatSortModule} from "@angular/material/sort";
import {AddtaskComponent} from "../../modules/todolist/addtask/addtask.component";
import {UpdatetaskComponent} from "../../modules/todolist/updatetask/updatetask.component";
import {UpdateInvoiceComponent} from "../../modules/invoice/update-invoice/update-invoice.component";
import {AddInvoiceComponent} from "../../modules/invoice/add-invoice/add-invoice.component";
import {InvoiceFactoryComponent} from "../../modules/invoice/invoice-factory/invoice-factory.component";


@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ReplacePipe,
    CalendarComponent,
    TodolistComponent,
    InvoiceComponent,
    ProfileComponent,
    AddtaskComponent,
    UpdatetaskComponent,
    UpdateInvoiceComponent,
    AddInvoiceComponent,
    InvoiceFactoryComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        SharedModule,
        ReactiveFormsModule,
        MatSortModule,
        FormsModule
    ]
})
export class DefaultModule {
}
