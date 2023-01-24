import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AdminCategoryNameDto} from "../common/dto/adminCategoryNamesDto";

import {AdminCategoryService} from "../admin-category/admin-category.service";

@Component({
  selector: 'app-admin-product-form',
  template: `
    <div [formGroup]="parentForm" fxLayout="column">
      <mat-form-field appearance="fill">
        <mat-label>Product Name</mat-label>
        <input matInput placeholder="Input new product name" formControlName="name">
        <div *ngIf="name?.invalid && (name?.dirty || name?.touched)">
          <mat-error *ngIf="name?.errors?.['required']">Product name is required</mat-error>
          <mat-error *ngIf="name?.errors?.['minlength']">Product name must be at least 3 characters long</mat-error>
          <mat-error *ngIf="name?.errors?.['maxlength']">Product name must be at most 255 characters long</mat-error>
        </div>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Friendly URL</mat-label>
        <input matInput placeholder="Input URL" formControlName="slug">
        <div *ngIf="slug?.invalid && (slug?.dirty || slug?.touched)">
          <mat-error *ngIf="slug?.errors?.['required']">URL is required</mat-error>
          <mat-error *ngIf="slug?.errors?.['minlength']">URL must be at least 3 characters long</mat-error>
          <mat-error *ngIf="slug?.errors?.['maxlength']">URL must be at most 255 characters long</mat-error>
        </div>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Product Description</mat-label>
        <input matInput rows="10" placeholder="Input new product description"
               formControlName="description">
        <div *ngIf="description?.invalid && (description?.dirty || description?.touched)">
          <mat-error *ngIf="description?.errors?.['required']">Product description is required</mat-error>
          <mat-error *ngIf="description?.errors?.['minlength']">Product description must be at least 3
            characters long
          </mat-error>
          <mat-error *ngIf="description?.errors?.['maxlength']">Product description must be at most 255
            characters long
          </mat-error>
        </div>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Full description</mat-label>
        <textarea matInput rows="20" placeholder="Input full description"
                  formControlName="fullDescription"></textarea>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Category</mat-label>
        <mat-select formControlName="categoryId">
          <mat-option *ngFor="let category of categories" [value]="category.id">
            {{category.name}}
          </mat-option>
        </mat-select>
        <div *ngIf="categoryId?.invalid && (categoryId?.dirty || categoryId?.touched)">
          <mat-error *ngIf="categoryId?.errors?.['required']">Product category is required</mat-error>
        </div>
      </mat-form-field>


      <mat-form-field appearance="fill">
        <mat-label>Price</mat-label>
        <input matInput placeholder="Input new price" formControlName="price">
        <div *ngIf="price?.invalid && (price?.dirty || price?.touched)">
          <mat-error *ngIf="price?.errors?.['required']">Price is required</mat-error>
          <mat-error *ngIf="price?.errors?.['min']">Price must be greater than 0</mat-error>
          <mat-error *ngIf="price?.errors?.['pattern']">Price must be a number</mat-error>
        </div>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Currency</mat-label>
        <input matInput placeholder="Input new currency" formControlName="currency">
        <div *ngIf="currency?.invalid && (currency?.dirty || currency?.touched)">
          <mat-error *ngIf="currency?.errors?.['required']">Currency is required</mat-error>
          <mat-error *ngIf="currency?.errors?.['minlength']">Currency must be at least 3 characters long
          </mat-error>
          <mat-error *ngIf="currency?.errors?.['maxlength']">Currency must be at most 255 characters long
          </mat-error>
        </div>
      </mat-form-field>

      <div fxLayoutAlign="end">
        <button mat-flat-button color="primary" [disabled]="!parentForm.valid">Submit</button>
      </div>
    </div>`,
})
export class AdminProductFormComponent implements OnInit {

  @Input() parentForm!: FormGroup;

  categories: Array<AdminCategoryNameDto> = [];

  constructor(private adminCategoryService: AdminCategoryService) {
  }

  ngOnInit(): void {
    this.getCategoryNames();
  }

  getCategoryNames() {
    this.adminCategoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  get name() {
    return this.parentForm.get('name');
  }

  get description() {
    return this.parentForm.get('description');
  }

  get categoryId() {
    return this.parentForm.get('categoryId');
  }

  get price() {
    return this.parentForm.get('price');
  }

  get currency() {
    return this.parentForm.get('currency');
  }

  get slug() {
    return this.parentForm.get('slug');
  }

  get fullDescription() {
    return this.parentForm.get('fullDescription');
  }


}
