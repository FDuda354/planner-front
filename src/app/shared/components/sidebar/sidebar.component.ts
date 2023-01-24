import {Component, OnInit} from '@angular/core';
import {SidebarService} from "./sidebar.service";
import {SidebarCategory} from "./model/sidebarCategory";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories: Array<SidebarCategory> = [];

  constructor(private sidebarService: SidebarService) {
  }

  getCategories() {
    this.sidebarService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

}
