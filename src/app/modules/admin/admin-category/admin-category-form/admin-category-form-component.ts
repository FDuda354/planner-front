import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";


@Component({
  selector: 'app-admin-category-form',
  template: `
    <div [formGroup]="parentForm" fxLayout="column">
      <mat-form-field appearance="fill">
        <mat-label>Category Name</mat-label>
        <input matInput placeholder="Input new category name" formControlName="name">
        <div *ngIf="name?.invalid && (name?.dirty || name?.touched)">
          <mat-error *ngIf="name?.errors?.['required']">Category name is required</mat-error>
          <mat-error *ngIf="name?.errors?.['minlength']">Category name must be at least 3 characters long
          </mat-error>
          <mat-error *ngIf="name?.errors?.['maxlength']">Category name must be at most 255 characters long
          </mat-error>
        </div>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Friendly URL</mat-label>
        <input matInput placeholder="Input URL" formControlName="slug">
        <div *ngIf="slug?.invalid && (slug?.dirty || slug?.touched)">
          <mat-error *ngIf="slug?.errors?.['required']">URL is required</mat-error>
          <mat-error *ngIf="slug?.errors?.['minlength']">URL must be at least 3 characters long
          </mat-error>
          <mat-error *ngIf="slug?.errors?.['maxlength']">URL must be at most 255 characters long
          </mat-error>
        </div>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Category Description</mat-label>
        <input matInput placeholder="Input new category description"
               formControlName="description">
        <div *ngIf="description?.invalid && (description?.dirty || description?.touched)">
          <mat-error *ngIf="description?.errors?.['required']">Category description is required</mat-error>
          <mat-error *ngIf="description?.errors?.['minlength']">Category description must be at least 3
            characters long
          </mat-error>
          <mat-error *ngIf="description?.errors?.['maxlength']">Category description must be at most 255
            characters long
          </mat-error>
        </div>
      </mat-form-field>

      <div fxLayoutAlign="end">
        <button mat-flat-button color="primary" [disabled]="!parentForm.valid">Submit</button>
      </div>
    </div>`,
})
export class AdminCategoryFormComponent implements OnInit {

  @Input() parentForm!: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  get name() {
    return this.parentForm.get('name');
  }

  get description() {
    return this.parentForm.get('description');
  }

  get slug() {
    return this.parentForm.get('slug');
  }


}
