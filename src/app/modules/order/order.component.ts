import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {OrderService} from "./order.service";
import {BasketSummary} from "../common/model/basket/basketSummary";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderDto} from "./model/orderDto";
import {OrderSummary} from "./model/orderSummary";
import {BasketIconService} from "../common/service/basket-icon.service";
import {InitData} from "./model/initData";
import {JwtService} from "../common/service/jwt.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  basketSummary!: BasketSummary;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  deliveryFormGroup!: FormGroup;
  paymentFormGroup!: FormGroup;
  orderSummary!: OrderSummary;
  initData!: InitData;
  errorMessage = false;
  isLogged = false;

  private statuses = new Map<string, string>([

    ["NEW", "New"],
    ["PAID", "Paid"],
    ["SHIPPED", "Shipped"],
    ["DELIVERED", "Delivered"],
    ["CANCELLED", "Cancelled"]
  ]);

  constructor(
    private cookieService: CookieService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private basketIconService: BasketIconService,
    private jwtService: JwtService
  ) {
  }

  ngOnInit(): void {

    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(60)]],
      phone: ['+48 ', [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.maxLength(15), Validators.minLength(15)]]
    });

    this.secondFormGroup = this.formBuilder.group({
      street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      zipCode: ['', [Validators.required, Validators.pattern("^[0-9]{2}-[0-9]{3}$")]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });

    this.deliveryFormGroup = this.formBuilder.group({
      shipment: ['', Validators.required]
    });

    this.paymentFormGroup = this.formBuilder.group({
      payment: ['', Validators.required]
    });
    this.getInitData();
    this.checkBasketEmpty();
    this.isLogged = this.jwtService.isLoggedIn();


  }

  checkBasketEmpty() {
    let basketId = Number(this.cookieService.get("basketId"));
    this.orderService.getBasket(basketId)
      .subscribe(summary => {
        this.basketSummary = summary;
      });
  }

  submitOrder() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.deliveryFormGroup.valid //&& this.paymentFormGroup.valid
    ) {
      console.log("p.get('shipment')?.value===" +this.deliveryFormGroup.get('shipment')?.value);
      console.log("up.get('shipment')?.value.id===" +this.deliveryFormGroup.get('shipment')?.value.id);
      console.log("up.get('shipment')===" +this.deliveryFormGroup.get('shipment'));

      this.orderService.makeOrder({

        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        street: this.street?.value,
        zipCode: this.zipCode?.value,
        city: this.city?.value,
        email: this.email?.value,
        phone: this.phone?.value,
        basketId: Number(this.cookieService.get("basketId")),
        shipmentId: Number(this.deliveryFormGroup.get('shipment')?.value.id),
        paymentId: Number(this.paymentFormGroup.get('payment')?.value.id)

      } as OrderDto).subscribe({
        next: orderSummary => {
          this.orderSummary = orderSummary;
          this.basketIconService.setDefaultBasketIcon();
          this.cookieService.delete("basketId");
          this.errorMessage = false;

        }, error: error => {
          this.errorMessage = true;
        }
      });
    }
  }

  getInitData() {
    this.orderService.getInitData().subscribe(initData => {
      this.initData = initData;
      this.setDefaultShipment();
      this.setDefaultPayment();
    });
  }

  private setDefaultShipment() {
    // this.formGroup.patchValue({"shipment": this.initData.shipments.filter(shipment => shipment.defaultShipment)[0]})
    //TODO: to remove
    this.secondFormGroup.patchValue({
      "shipment": this.initData.shipments
        .filter(shipment => shipment.defaultShipment)[0]
    })
  }

  private setDefaultPayment() {
    this.secondFormGroup.patchValue({
      "payment": this.initData.payments.filter(payment => payment.defaultPayment)[0]
    })
  }

  getStatus(status: string) {
    return this.statuses.get(status);
  }

  get firstName() {
    return this.firstFormGroup.get('firstName');
  }

  get lastName() {
    return this.firstFormGroup.get('lastName');
  }

  get street() {
    return this.secondFormGroup.get('street');
  }

  get zipCode() {
    return this.secondFormGroup.get('zipCode');
  }

  get city() {
    return this.secondFormGroup.get('city');
  }

  get email() {
    return this.firstFormGroup.get('email');
  }

  get phone() {
    return this.firstFormGroup.get('phone');
  }

  get shipment() {
    return this.deliveryFormGroup.get('shipment');
  }

  get payment() {
    return this.paymentFormGroup.get('payment');
  }

}
