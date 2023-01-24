import {Category} from "./category";
import {Product} from "../../product/model/product";
import {Page} from "../../../shared/model/page";

export interface CategoryProducts {
  category: Category;
  productsPage: Page<Product>;
}
