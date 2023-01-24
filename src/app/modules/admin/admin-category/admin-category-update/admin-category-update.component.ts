import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

import {AdminMessageService} from "../../admin-message.service";
import {AdminCategoryService} from "../admin-category.service";
import {AdminCategory} from "../model/adminCategory";

@Component({
  selector: 'app-admin-category-update',
  templateUrl: './admin-category-update.component.html',
  styleUrls: ['./admin-category-update.component.css']
})
export class AdminCategoryUpdateComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminCategoryService: AdminCategoryService,
    private adminMessageService: AdminMessageService,
  ) {
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: [''],
      slug: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
    this.getCategory();
  }

  submit() {
    this.adminCategoryService.updateCategory(Number(this.route.snapshot.params['id']), this.categoryForm.value)
      .subscribe({
        next: category => {
          this.mapCategoryToForm(category);
          this.router.navigate(['/admin/categories'])
            .then(() => {
              this.snackBar.open('Category updated successfully', 'OK', {duration: 2000});
            });

        },
        error: err => {
          this.adminMessageService.addSpringErrors(err.error);
        }
      });
  }

  private getCategory() {
    this.adminCategoryService.getCategory(Number(this.route.snapshot.params['id']))
      .subscribe(category => this.mapCategoryToForm(category));
  }

  private mapCategoryToForm(category: AdminCategory) {
    this.categoryForm.setValue({
      name: category.name,
      description: category.description,
      slug: category.slug
    });
  }
}
