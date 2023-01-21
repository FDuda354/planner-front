import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-product-form',
  template: `
      <div [formGroup]="parentForm" fxLayout="column">
          <mat-form-field appearance="fill">
              <mat-label>Product Name</mat-label>
              <input matInput placeholder="Input new product name" formControlName="name">
          </mat-form-field>

          <mat-form-field appearance="fill">
              <mat-label>Product Description</mat-label>
              <textarea matInput rows="10" placeholder="Input new product description"
                        formControlName="description"></textarea>
          </mat-form-field>

          <mat-form-field appearance="fill">
              <mat-label>Category</mat-label>
              <input matInput placeholder="Input new product category" formControlName="category">
          </mat-form-field>

          <mat-form-field appearance="fill">
              <mat-label>Price</mat-label>
              <input matInput placeholder="Input new price" formControlName="price">
          </mat-form-field>

          <mat-form-field appearance="fill">
              <mat-label>Currency</mat-label>
              <input matInput placeholder="Input new currency" formControlName="currency">
          </mat-form-field>

          <div fxLayoutAlign="end">
              <button mat-flat-button color="primary">Submit</button>
          </div>
      </div>`,
})
export class AdminProductFormComponent implements OnInit {

  @Input() parentForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
