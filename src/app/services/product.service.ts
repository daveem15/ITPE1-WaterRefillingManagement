import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  BASE_URL = 'http://localhost:3000/product/';
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get<Products[]>(this.BASE_URL);
  }
}
