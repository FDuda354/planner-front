import {Component, OnInit} from '@angular/core';
import {AdminProductUpdate} from "../admin-product-update/model/adminProductUpdate";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminProductAddService} from "./admin-product-add.service";

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.css']
})
export class AdminProductAddComponent  implements OnInit{
  product!: AdminProductUpdate;
  productForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private adminProductAddService: AdminProductAddService,
    private snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      price: [''],
      currency: ['PLN']
    });
  }

  submit() {
    this.adminProductAddService.saveNewProduct(this.productForm.value).subscribe(product => {
      this.router.navigate(['/admin/products'])
        .then(() => this.snackBar.open("Product added", "OK", {duration: 3000}))
    });
  }

}
