import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {InvoiceService} from "../invoice.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminMessageService} from "../../admin/common/service/admin-message.service";
import {FInvoice} from "./model/fInvoice";
import {FInvoiceItems} from "./model/fInvoiceItems";

@Component({
  selector: 'app-invoice-factory',
  templateUrl: './invoice-factory.component.html',
  styleUrls: ['./invoice-factory.component.css']
})
export class InvoiceFactoryComponent implements OnInit {

  invoiceForm!: FormGroup;
  invoiceItemsForm!: FormGroup;
  items: FInvoiceItems[] = [];
  displayedColumns: string[] = ['productName', 'productQuantity', 'productPriceBrutto', 'delete'];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) {
  }

  ngOnInit(): void {
    this.items = [];
    this.invoiceForm = this.formBuilder.group({
      companyName: ['HERCU PANUEMATIC', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      companyZipCode: ['12-231', [Validators.required, Validators.pattern("^[0-9]{2}-[0-9]{3}$")]],
      companyAddress: ['kwiatowa 13', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      companyNIP: ['1234506987', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.minLength(10), Validators.maxLength(10)]],
      invoiceId: ['1234', [Validators.required, Validators.minLength(3), Validators.maxLength(200), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      vat: ['23', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      companyBankNumber: ['12331', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      paymentMethod: ['Przelew', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],

      customerCompanyName: ['FILIP PANUEMATIC', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      customerZipCode: ['35-231', [Validators.required, Validators.pattern("^[0-9]{2}-[0-9]{3}$")]],
      customerCompanyAddress: ['witolda 13', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      customerCompanyNIP: ['2234502987', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.minLength(10), Validators.maxLength(10)]],

    });

    this.invoiceItemsForm = this.formBuilder.group({
      productPriceBrutto: ['22331', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      productName: ['Rower', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      productQuantity: ['1', [Validators.required, Validators.min(1), Validators.max(2000000000), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      delete: ['']
    });

  }

  submit() {
    this.invoiceService.generateInvoice({
      customerCompanyName: this.customerCompanyName?.value,
      customerZipCode: this.customerZipCode?.value,
      customerCompanyAddress: this.customerCompanyAddress?.value,
      customerCompanyNIP: this.customerCompanyNIP?.value,
      invoiceId: this.invoiceId?.value,
      vat: this.vat?.value,
      companyName: this.companyName?.value,
      companyZipCode: this.companyZipCode?.value,
      companyAddress: this.companyAddress?.value,
      companyNIP: this.companyNIP?.value,
      companyBankNumber: this.companyBankNumber?.value,
      paymentMethod: this.paymentMethod?.value,
      items: this.items
    } as FInvoice).subscribe(response => {
      let a = document.createElement('a');
      let url = URL.createObjectURL(response.body);
      a.href = url;
      a.download = response.headers.get('Content-Disposition');
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  addItem() {
    if (this.items.length < 10 && this.invoiceItemsForm.valid) {
      const item = {
        productName: this.productName?.value,
        productQuantity: this.productQuantity?.value,
        productPriceBrutto: this.productPriceBrutto?.value
      } as FInvoiceItems;

      this.items.push(item);
      this.invoiceItemsForm.reset();
      this.displayedColumns = [];
      setTimeout(() => {
        this.displayedColumns = ['productName', 'productQuantity', 'productPriceBrutto', 'delete'];
      }, 0);
    }

  }

  onCancel() {
    this.router.navigate(['/invoices']);
  }

  deleteItem() {
    this.items.pop();
    this.invoiceItemsForm.reset();
    this.displayedColumns = [];
    setTimeout(() => {
      this.displayedColumns = ['productName', 'productQuantity', 'productPriceBrutto', 'delete'];
    }, 0);
  }

  get productName() {
    return this.invoiceItemsForm.get('productName');
  }

  get productQuantity() {
    return this.invoiceItemsForm.get('productQuantity');
  }

  get productPriceBrutto() {
    return this.invoiceItemsForm.get('productPriceBrutto');
  }

  get customerCompanyName() {
    return this.invoiceForm.get('customerCompanyName');
  }

  get customerZipCode() {
    return this.invoiceForm.get('customerZipCode');
  }

  get customerCompanyAddress() {
    return this.invoiceForm.get('customerCompanyAddress');
  }

  get customerCompanyNIP() {
    return this.invoiceForm.get('customerCompanyNIP');
  }

  get invoiceId() {
    return this.invoiceForm.get('invoiceId');
  }

  get vat() {
    return this.invoiceForm.get('vat');
  }

  get totalPriceBrutto() {
    return this.invoiceForm.get('totalPriceBrutto');
  }

  get companyName() {
    return this.invoiceForm.get('companyName');
  }

  get companyZipCode() {
    return this.invoiceForm.get('companyZipCode');
  }

  get companyAddress() {
    return this.invoiceForm.get('companyAddress');
  }

  get companyNIP() {
    return this.invoiceForm.get('companyNIP');
  }

  get companyBankNumber() {
    return this.invoiceForm.get('companyBankNumber');
  }

  get paymentMethod() {
    return this.invoiceForm.get('paymentMethod');
  }

}
