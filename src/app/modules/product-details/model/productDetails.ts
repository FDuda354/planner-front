import {Review} from "./review";

export interface ProductDetails {
  id: number;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  price: number;
  currency: string;
  slug: string;
  image: string;
  reviews: Array<Review>;

}
