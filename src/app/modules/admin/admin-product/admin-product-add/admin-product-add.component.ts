import {Component, OnInit} from '@angular/core';
import {AdminProductUpdate} from "../model/adminProductUpdate";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminProductAddService} from "./admin-product-add.service";
import {AdminMessageService} from "../../common/service/admin-message.service";
import {AdminProductImageService} from "../admin-product-image.service";

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.css']
})
export class AdminProductAddComponent implements OnInit {
  product!: AdminProductUpdate;
  productForm!: FormGroup;

  imageForm!: FormGroup;
  requiredFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
  image: string | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private adminProductAddService: AdminProductAddService,
    private adminProductImageService: AdminProductImageService,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      fullDescription: [''],
      categoryId: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      currency: ['PLN', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      slug: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
    });

    this.imageForm = this.formBuilder.group({
      file: ['']
    });
  }

  submit() {
    this.adminProductAddService.saveNewProduct({
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      fullDescription: this.productForm.get('fullDescription')?.value,
      categoryId: this.productForm.get('categoryId')?.value,
      price: this.productForm.get('price')?.value,
      currency: this.productForm.get('currency')?.value,
      slug: this.productForm.get('slug')?.value,
      image: this.image
    } as AdminProductUpdate).subscribe({
      next: product => {
        this.router.navigate(['/admin/products'])
          .then(() => this.snackBar.open("Product added", "OK", {duration: 3000}))
      },
      error: err => {
        this.adminMessageService.addSpringErrors(err.error);
      }
    });
  }

  uploadFile() {
    let formData = new FormData();
    formData.append('file', this.imageForm.get('file')?.value);
    this.adminProductImageService.uploadImage(formData).subscribe(
      result => {
        this.image = result.fileName;
        this.snackBar.open("Image uploaded", "OK", {duration: 3000});
      });
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      this.imageForm.patchValue({
        file: event.target.files[0]
      })
    }
  }

}
