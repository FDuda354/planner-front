import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AdminOrderService } from '../admin-order.service';
import { AdminOrder } from '../model/adminOrder';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-order-update',
  templateUrl: './admin-order-update.component.html',
  styleUrls: ['./admin-order-update.component.scss']
})
export class AdminOrderUpdateComponent implements OnInit {

  order!: AdminOrder;
  formGroup!: FormGroup;
  statuses!: Map<string,string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminOrderService: AdminOrderService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getInitData();
    this.formGroup = this.formBuilder.group({
      orderStatus: ['',Validators.required]
    });
    this.getOrder();
  }

  getOrder() {
    let id = Number(this.activatedRoute.snapshot.params['id']);
    this.adminOrderService.getOrder(id)
      .subscribe(order => {
        this.order = order;
        this.formGroup.setValue({
          orderStatus: order.orderStatus
        })

      });
  }

  changeStatus() {

    this.adminOrderService.changeStatus(this.order.id, this.formGroup.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/orders'])
            .then(() => this.snackBar.open("Order status updated", "OK", {duration: 3000}));
        }
      });

  }

  private getInitData() {
    this.adminOrderService.getInitData()
      .subscribe(data  => {
        this.statuses = data.orderStatuses;
      });
  }
}
