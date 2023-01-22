import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminProductUpdate} from "./model/adminProductUpdate";
import {AdminProductUpdateService} from "./admin-product-update.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminMessageService} from "../admin-message.service";

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.css']
})
export class AdminProductUpdateComponent implements OnInit {

  product!: AdminProductUpdate;
  productForm!: FormGroup;
  imageForm!: FormGroup;
  requiredFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
  image: string | null = null;

  constructor(
    private router: ActivatedRoute,
    private adminProductUpdateService: AdminProductUpdateService,
    private adminMessageService: AdminMessageService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
  }


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      currency: ['PLN', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      slug: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
    });
    this.getProduct();

    this.imageForm = this.formBuilder.group({
      file: ['']
    });
  }

  getProduct() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService.getProduct(id)
      .subscribe(product => this.mapFormValues(product));
  }

  submit() {
    let id = Number(this.router.snapshot.params['id']);
    // this.adminProductUpdateService.updateProduct(id,this.productForm.value) jak encja z formularza odpowiada encji na backendize
    //inaczej mapujemy
    this.adminProductUpdateService.updateProduct(id, {
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      category: this.productForm.get('category')?.value,
      price: this.productForm.get('price')?.value,
      currency: this.productForm.get('currency')?.value,
      slug: this.productForm.get('slug')?.value,
      image: this.image
    } as AdminProductUpdate).subscribe({
      next: product => {
        this.mapFormValues(product)
        this.snackBar.open("Product updated", "OK", {duration: 3000});
      },
      error: err => {
        this.adminMessageService.addSpringErrors(err.error);
      }
    });
  }

  private mapFormValues(product: AdminProductUpdate): void {
     this.productForm.setValue({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      currency: product.currency,
      slug: product.slug
    });
    this.image = product.image;
  }

  uploadFile() {
    let formData = new FormData();
    formData.append('file', this.imageForm.get('file')?.value);
    this.adminProductUpdateService.uploadImage(formData).subscribe(
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

