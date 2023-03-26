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
    return this.http.get<Array<Invoice>>('https://planerbackend.dudios.pl/invoices');
  }

  uploadImage(formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>("https://planerbackend.dudios.pl/invoice/upload-image", formData);
  }

  saveNewInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>("https://planerbackend.dudios.pl/invoice", invoice);

  }

  deleteInvoiceById(id: number) {
    return this.http.delete("https://planerbackend.dudios.pl/invoice/" + id);
  }

  getInvoiceBySlug(slug: string): Observable<Invoice> {
    return this.http.get<Invoice>("https://planerbackend.dudios.pl/invoice/" + slug);
  }

  updateInvoice(slug: string | null, invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>("https://planerbackend.dudios.pl/invoice/" + slug, invoice);
  }

  downloadInvoice(image: string): Observable<any> {
    return this.http.get(`https://planerbackend.dudios.pl/download/invoiceImage/${image}`,
      {responseType: 'blob', observe: 'response'}
    );

  }

  generateInvoice(invoice: FInvoice): Observable<any> {
    return this.http.post(`https://planerbackend.dudios.pl/invoice/create`, invoice,
      {responseType: 'blob', observe: 'response'}
    );

  }
}
