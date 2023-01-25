import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BasketService} from "./basket.service";
import {BasketSummary} from "./model/basketSummary";
import {CookieService} from "ngx-cookie-service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {BasketSummaryItem} from "./model/basketSummaryItem";


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{

  basketSummary!: BasketSummary;
  formGroup!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private basketService: BasketService,
    private cookieService: CookieService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    let productId = Number(this.route.snapshot.queryParams['productId']);
    if(productId > 0){
      this.addProductToBasket(productId);
    } else {
      this.getBasket();
    }
  }

  getBasket(){
    let basketId = Number(this.cookieService.get('basketId'));
    if(basketId > 0) {
      this.basketService.getBasket(basketId)
        .subscribe(summary => {
          this.basketSummary = summary;
          this.patchFormItems();
        });
    }
  }


  private addProductToBasket(productId: number) {
    let basketId = Number(this.cookieService.get('basketId'));
    this.basketService.addProductToBasket(basketId, {productId: productId, quantity: 1})
      .subscribe(summary => {
        this.basketSummary = summary;
        this.patchFormItems();
        this.cookieService.delete('basketId');
        this.cookieService.set('basketId', summary.id.toString(),this.expirationDate(3));
        this.router.navigate(['/basket']);
      });
  }

  patchFormItems() {
    let formItems = <FormArray>this.formGroup.get('items');
    this.basketSummary.items.forEach(item => {
      formItems.push(this.formBuilder.group({
        id: [item.id],
        quantity: [item.quantity],
        product: [item.product],
        linePrice: [item.linePrice]
    }));
  });
  }
  private expirationDate(days: number) {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  submit() {
    let basketId = Number(this.cookieService.get('basketId'));
    this.basketService.updateBasket(basketId, this.maptoRequestListDto())
      .subscribe(summary => {
        this.basketSummary = summary;
        this.formGroup.get('items')?.setValue(summary.items)
      });
  }

  private maptoRequestListDto(): any[] {
    let items: Array<BasketSummaryItem> = this.formGroup.get('items')?.value;
    return items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
    }));

  }

  removeItem(itemId: any) {
    this.basketService.removeBasketItem(itemId)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  get items() {
    return (<FormArray>this.formGroup.get('items')).controls;
  }
}
