import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orders } from '../models/orders';
import { ProductSales } from '../models/sales_per_product';
import { OrderPerAddress } from '../models/orders_by_address';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  BASE_URL = 'http://localhost:3000/order/';
  constructor(private http: HttpClient) {}

  getAllOrders() {
    return this.http.get<Orders[]>(this.BASE_URL);
  }
  createOrder(
    productID: number,
    gallons: number,
    total: number,
    user_id: number
  ) {
    return this.http.post<any>(this.BASE_URL + 'create', {
      productID,
      gallons,
      total,
      user_id,
    });
  }
  updateOrder(orderID: number) {
    const url = `${this.BASE_URL}update-order`;
    const params = new HttpParams().set('id', orderID);
    return this.http.put<any>(url, null, { params });
  }
  getTotalSalesPerProduct() {
    return this.http.get<ProductSales[]>(this.BASE_URL + 'sales');
  }

  getTotalCustomer() {
    return this.http.get<any>(this.BASE_URL + 'customers');
  }

  getOrdersPerAddress() {
    return this.http.get<OrderPerAddress[]>(this.BASE_URL + 'most-orders');
  }
  getTotalAndCompletedOrders() {
    return this.http.get<any>(this.BASE_URL + 'total-orders');
  }
}
