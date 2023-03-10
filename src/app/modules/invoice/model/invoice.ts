export interface Invoice {
  id: number;
  companyName: string;
  zipCode: string;
  companyAddress: string;
  companyNIP: string;
  date: Date;
  placeDate: Date;
  description: string;
  title: string;
  priceNetto: number;
  vat: number;
  priceBrutto: number;
  slug: string;
  image: string;
  userId: number;
}
