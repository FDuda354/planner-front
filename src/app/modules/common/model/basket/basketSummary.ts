import {BasketSummaryItem} from "./basketSummaryItem";
import {Summary} from "./summary";

export interface BasketSummary {
  id: number;
  items: Array<BasketSummaryItem>;

  summary: Summary;
}
