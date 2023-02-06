import {Component, OnInit} from '@angular/core';
import {AdminCategoryNameDto} from "../common/dto/adminCategoryNamesDto";
import {AdminCategoryService} from "./admin-category.service";
import {AdminConfirmDialogService} from "../common/service/admin-confirm-dialog.service";

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "actions"];
  categories: Array<AdminCategoryNameDto> = [];

  constructor(
    private adminCategoryService: AdminCategoryService,
    private adminConfirmDialogService: AdminConfirmDialogService
  ) {
  }

  confirmDelete(id: number) {
    this.adminConfirmDialogService.openDialog("Are you sure?")
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.adminCategoryService.deleteProduct(id).subscribe(() => {
            this.getCategories();
          });
        }
      });
  }

  getCategories() {
    this.adminCategoryService.getCategories().subscribe(
      categories => this.categories = categories.sort((a, b) => a.id - b.id)
    );
  }

  ngOnInit(): void {
    this.getCategories();
  }


}
