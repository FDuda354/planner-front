import {Component, OnInit} from '@angular/core';
import {Invoice} from "../model/invoice";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {InvoiceService} from "../invoice.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminMessageService} from "../../admin/common/service/admin-message.service";

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;

  imageForm!: FormGroup;
  requiredFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  image: string | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) {
  }

  ngOnInit(): void {
    this.invoiceForm = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      zipCode: ['', [Validators.required, Validators.pattern("^[0-9]{2}-[0-9]{3}$")]],
      companyAddress: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      companyNIP: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.minLength(10), Validators.maxLength(10)]],
      date: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      vat: ['', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      priceBrutto: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      slug: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]]

    });

    this.imageForm = this.formBuilder.group({
      file: ['']
    });
  }

  submit() {
    this.invoiceService.saveNewInvoice({
      ...this.invoiceForm.value,
      image: this.image
    } as Invoice).subscribe({
      next: invoice => {
        this.router.navigate(['/invoices'])
          .then(() => this.snackBar.open("invoice added", "OK", {duration: 3000}))
      },
      error: err => {
        this.adminMessageService.addSpringErrors(err.error);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/invoices']);
  }

  uploadFile() {
    let formData = new FormData();
    formData.append('file', this.imageForm.get('file')?.value);
    this.invoiceService.uploadImage(formData).subscribe(
      result => {
        this.image = result.fileName;
        this.snackBar.open("File uploaded", "OK", {duration: 3000});
      });
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      this.imageForm.patchValue({
        file: event.target.files[0]
      })
    }
  }

  get companyName() {
    return this.invoiceForm.get('companyName');
  }

  get zipCode() {
    return this.invoiceForm.get('zipCode');
  }

  get companyAddress() {
    return this.invoiceForm.get('companyAddress');
  }

  get companyNIP() {
    return this.invoiceForm.get('companyNIP');
  }

  get date() {
    return this.invoiceForm.get('date');
  }

  get description() {
    return this.invoiceForm.get('description');
  }

  get title() {
    return this.invoiceForm.get('title');
  }

  get vat() {
    return this.invoiceForm.get('vat');
  }

  get priceBrutto() {
    return this.invoiceForm.get('priceBrutto');
  }

  get slug() {
    return this.invoiceForm.get('slug');
  }


}
