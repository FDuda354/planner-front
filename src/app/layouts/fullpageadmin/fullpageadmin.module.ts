import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullpageadminComponent} from "./fullpageadmin.component";
import {AdminComponent} from "../../modules/admin/admin.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "../../shared/material.module";

import {ReactiveFormsModule} from "@angular/forms";

import {AdminMessageComponent} from "../../modules/admin/common/component/admin-message/admin-message.component";
import {
  AdminConfirmDialogComponent
} from "../../modules/admin/common/component/admin-confirm-dialog/admin-confirm-dialog.component";



@NgModule({
  declarations: [
    FullpageadminComponent,
    AdminComponent,
    AdminMessageComponent,
    AdminConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FullpageadminModule {
}
