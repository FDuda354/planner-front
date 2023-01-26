import {ProductItem} from "./productItem";

export interface BasketSummaryItem {
  id: number;
  quantity: number;

  linePrice: number;

  product: ProductItem;
}
