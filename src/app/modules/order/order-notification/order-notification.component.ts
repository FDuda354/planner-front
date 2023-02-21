import {Component, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {ActivatedRoute} from "@angular/router";
import {interval, mergeMap, takeUntil, takeWhile, timer} from "rxjs";

@Component({
  selector: 'app-order-notification',
  templateUrl: './order-notification.component.html',
  styleUrls: ['./order-notification.component.css']
})
export class OrderNotificationComponent implements OnInit {

  isStatusPaid = false;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.getStatus();
  }

  private getStatus() {
    let hash = this.route.snapshot.params['orderHash'];
    this.orderService.getStatus(hash).subscribe(
      status => {
        this.isStatusPaid = status.paid;
        if (!status.paid){
          interval(7000).pipe(
            mergeMap(() => this.orderService.getStatus(hash)),
            takeUntil(timer(3*60*1000)),
            takeWhile(status => !status.paid, true)
          ).subscribe(status => this.isStatusPaid = status.paid);
        }
      });

  }
}
