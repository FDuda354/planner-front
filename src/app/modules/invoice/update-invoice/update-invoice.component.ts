import {Component, OnInit} from '@angular/core';
import {Invoice} from "../model/invoice";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {InvoiceService} from "../invoice.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminMessageService} from "../../admin/common/service/admin-message.service";

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponent implements OnInit {

  invoiceForm!: FormGroup;

  imageForm!: FormGroup;
  requiredFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  image: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

    this.getInvoice();
  }

  private getInvoice() {

    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.invoiceService.getInvoiceBySlug(slug).subscribe({
        next: invoice => {
          this.invoiceForm.patchValue({
            companyName: invoice.companyName,
            zipCode: invoice.zipCode,
            companyAddress: invoice.companyAddress,
            companyNIP: invoice.companyNIP,
            date: invoice.date,
            description: invoice.description,
            title: invoice.title,
            vat: invoice.vat,
            priceBrutto: invoice.priceBrutto,
            slug: invoice.slug
          });
          this.image = invoice.image;
        },
        error: err => {
          this.adminMessageService.addSpringErrors(err.error);
        }
      });
    }
  }

  submit() {
    let slug = this.route.snapshot.paramMap.get('slug');

    this.invoiceService.updateInvoice(slug, {
      ...this.invoiceForm.value,
      image: this.image
    } as Invoice).subscribe({
      next: invoice => {
        this.router.navigate(['/invoices'])
          .then(() => this.snackBar.open("invoice updated", "OK", {duration: 3000}))
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
