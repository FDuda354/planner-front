import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Task} from "./model/task";
import {TodolistService} from "./todolist.service";
import {startWith, switchMap} from "rxjs";
import {AdminConfirmDialogService} from "../admin/common/service/admin-confirm-dialog.service";
import {MatSort, MatSortable} from "@angular/material/sort";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';


// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'deadline', 'completed', "actions"];
  totalElements: number = 0;
  dataSource!: MatTableDataSource<Task>;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private todoListService: TodolistService,
    private adminConfirmDialogService: AdminConfirmDialogService,
  ) {}

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.todoListService.getTasks(this.paginator.pageIndex, this.paginator.pageSize);
      })
    ).subscribe(data => {
      this.totalElements = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
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
    this.adminConfirmDialogService.openDialog("delete this task?")
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.todoListService.deleteTask(id).subscribe(() => {
            this.paginator.page.emit();
          });
        }
      });
  }

  changeStatus(completed: boolean, id: number) {
    this.todoListService.changeStatus(id, completed).subscribe(() => {
      this.paginator.page.emit();
    });
  }
}
