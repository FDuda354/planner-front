import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invoice} from "./model/invoice";
import {UploadResponse} from "../common/model/uploadResponse";
import {FInvoice} from "./invoice-factory/model/fInvoice";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) {
  }

  getInvoices(): Observable<Array<Invoice>> {
    return this.http.get<Array<Invoice>>('/api/invoices');
  }

  uploadImage(formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>("/api/invoice/upload-image", formData);
  }

  saveNewInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>("/api/invoice", invoice);

  }

  deleteInvoiceById(id: number) {
    return this.http.delete("/api/invoice/" + id);
  }

  getInvoiceBySlug(slug: string): Observable<Invoice> {
    return this.http.get<Invoice>("/api/invoice/" + slug);
  }

  updateInvoice(slug: string | null, invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>("/api/invoice/" + slug, invoice);
  }

  downloadInvoice(image: string): Observable<any> {
    return this.http.get(`/api/download/invoiceImage/${image}`,
      {responseType: 'blob', observe: 'response'}
    );

  }

  generateInvoice(invoice: FInvoice): Observable<any> {
    return this.http.post(`/api/invoice/create`, invoice,
      {responseType: 'blob', observe: 'response'}
    );

  }
}
