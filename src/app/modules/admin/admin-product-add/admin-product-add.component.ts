import {Component, OnInit} from '@angular/core';
import {AdminProductUpdate} from "../admin-product-update/model/adminProductUpdate";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminProductAddService} from "./admin-product-add.service";
import {AdminMessageService} from "../admin-message.service";

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.css']
})
export class AdminProductAddComponent implements OnInit {
  product!: AdminProductUpdate;
  productForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private adminProductAddService: AdminProductAddService,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      price: ['', [Validators.required, Validators.min(0),Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      currency: ['PLN', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      slug: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
    });
  }

  submit() {
    this.adminProductAddService.saveNewProduct(this.productForm.value).subscribe({
      next: product => {
        this.router.navigate(['/admin/products'])
          .then(() => this.snackBar.open("Product added", "OK", {duration: 3000}))
      },
      error: err => {
        this.adminMessageService.addSpringErrors(err.error);
      }
    });
  }

}
