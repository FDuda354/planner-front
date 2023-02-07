import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FullpageuserComponent} from "./fullpageuser.component";
import {EditProfileComponent} from "../../modules/profile/edit-profile/edit-profile.component";
import {UserReviewsComponent} from "../../modules/profile/user-reviews/user-reviews.component";




@NgModule({
  declarations: [
    FullpageuserComponent,
    EditProfileComponent,
    UserReviewsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FullpageuserModule { }
