import { Injectable } from '@angular/core';
import {Product} from "./model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Product[] {
    return [
      {name: 'Produkt 1', category: 'Kategoria 1',description:"opis" ,price: 10.09,currency:"PLN"},
      {name: 'Produkt 2', category: 'Kategoria 2',description:"opis" ,price: 10.09,currency:"PLN"},
      {name: 'Produkt 3', category: 'Kategoria 3',description:"opis" ,price: 10.09,currency:"PLN"},
      {name: 'Produkt 4', category: 'Kategoria 4',description:"opis" ,price: 10.09,currency:"PLN"},
      {name: 'Produkt 5', category: 'Kategoria 5',description:"opis" ,price: 10.09,currency:"PLN"}
    ];
  }
}
