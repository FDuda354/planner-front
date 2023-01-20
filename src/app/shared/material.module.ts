import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatListModule
  ]
})
export class MaterialModule { }
