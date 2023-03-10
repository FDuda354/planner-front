import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Invoice} from "./model/invoice";
import {InvoiceService} from "./invoice.service";
import {AdminConfirmDialogService} from "../admin/common/service/admin-confirm-dialog.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InvoiceComponent implements AfterViewInit {
  dataSource!: MatTableDataSource<Invoice>;
  columnsToDisplay = ['title', 'companyName', 'companyNIP', 'date', 'priceBrutto', 'vat', 'priceNetto'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Invoice | null;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private invoiceService: InvoiceService,
    private adminConfirmDialogService: AdminConfirmDialogService
  ) {
  }

  ngAfterViewInit(): void {
    this.invoiceService.getInvoices().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  confirmDelete(id: number) {
    this.adminConfirmDialogService.openDialog("delete this invoice?")
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.invoiceService.deleteInvoiceById(id).subscribe(() => {
            //refresh table
            this.invoiceService.getInvoices().subscribe(data => {
              this.dataSource = new MatTableDataSource(data);
              this.dataSource.sort = this.sort;
            });
          });
        }
      });
  }

  downloadImage(image: string) {
    this.invoiceService.downloadInvoice(image).subscribe(response => {
      let a = document.createElement('a');
      let url = URL.createObjectURL(response.body);
      a.href = url;
      a.download = response.headers.get('Content-Disposition');
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}

