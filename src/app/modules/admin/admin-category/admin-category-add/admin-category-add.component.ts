import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

import {AdminMessageService} from "../../common/service/admin-message.service";
import {AdminCategoryService} from "../admin-category.service";

@Component({
  selector: 'app-admin-category-add',
  templateUrl: './admin-category-add.component.html',
  styleUrls: ['./admin-category-add.component.css']
})
export class AdminCategoryAddComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private adminCategoryService: AdminCategoryService,
              private adminMessageService: AdminMessageService,
  ) {
  }

  submit() {
    this.adminCategoryService.addCategory(this.categoryForm.value).subscribe({
      next: category => {
        this.router.navigate(['/admin/categories'])
          .then(() => {
            this.snackBar.open('Category added successfully', 'OK', {duration: 2000});
          });
      },
      error: err => {
        this.snackBar.open('Error adding category', 'OK', {duration: 3000});
        this.adminMessageService.addSpringErrors(err.error);
      }
    });
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: [''],
      slug: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }
}
