import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Products } from 'src/app/models/products';
import { Users } from 'src/app/models/users';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  OrdersForm: FormGroup;
  products: Products[] = [];
  users: Users | null = null;
  constructor(
    private _fb: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {
    this.OrdersForm = this._fb.group({
      TypeofWater: '',
      NumberofGallons: '',
    });
    let user: Users | null = JSON.parse(localStorage.getItem('user') || 'null');

    this.users = user;
    console.log(this.users);
    productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(this.products);
      },
    });
  }
  submitForm() {
    const product: Products | null = this.getProductById(
      +this.OrdersForm.value.TypeofWater ?? 1
    );
    if (product !== null && this.users !== null) {
      const productID: number = +this.OrdersForm.value.TypeofWater ?? 1;
      const gallons: number = +this.OrdersForm.value.NumberofGallons ?? 1;
      const total: number = product.price * gallons;
      const user_id: number = this.users.id;
      this.createOrder(productID, gallons, total, user_id);
    }
  }

  createOrder(
    productID: number,
    gallons: number,
    total: number,
    user_id: number
  ) {
    this.orderService
      .createOrder(productID, gallons, total, user_id)
      .subscribe({
        next: (data) => {
          this.toastr.success(data['message'] || 'Order Successful');
        },
        error: (err) => {
          this.toastr.error(err['message'] || 'unknown error');
        },
      });
  }

  getProductById(id: number): Products | null {
    const product = this.products.find((p) => p.id === id);
    return product || null;
  }
}
