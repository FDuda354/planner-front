import {FInvoiceItems} from "./fInvoiceItems";

export interface FInvoice {
  customerCompanyName: string;
  customerZipCode: string;
  customerCompanyAddress: string;
  customerCompanyNIP: string;
  invoiceId: number;
  totalPpriceNetto: number;
  vat: number;
  totalPriceBrutto: number;
  companyName: string;
  companyZipCode: string;
  companyAddress: string;
  companyNIP: string;
  companyBankNumber: string;
  paymentMethod: string;
  items: FInvoiceItems[];
}
