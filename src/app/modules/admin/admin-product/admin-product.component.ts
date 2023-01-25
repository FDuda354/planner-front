import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AdminProduct} from "./model/adminProduct";
import {AdminProductService} from "./admin-product.service";
import {MatPaginator} from "@angular/material/paginator";
import {startWith, switchMap} from "rxjs";
import {AdminConfirmDialogService} from "../common/service/admin-confirm-dialog.service";

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ["id", "image", "name", "price", "category", "actions"];
  totalElements: number = 0;
  adminProducts: AdminProduct[] = [];


  constructor(private adminProductService: AdminProductService,
              private adminConfirmDialogService: AdminConfirmDialogService
  ) {
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminProductService.getProducts(this.paginator.pageIndex, this.paginator.pageSize);
      })
    ).subscribe(data => {
      this.totalElements = data.totalElements;
      this.adminProducts = data.content;
    });
  }

  confirmDelete(id: number) {
    this.adminConfirmDialogService.openDialog("Are you sure?")
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.adminProductService.deleteProduct(id).subscribe(() => {
            this.paginator.page.emit();
          });
        }
      });
  }
}
