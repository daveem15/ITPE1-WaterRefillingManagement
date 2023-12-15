import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersComponent } from '../admin-forms/orders/orders.component';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationsComponent } from '../admin-forms/notifications/notifications.component';
import { UserFormComponent } from '../admin-forms/user-form/user-form.component';
import { OrderService } from 'src/app/services/order.service';
import { Orders } from 'src/app/models/orders';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent {
  displayedColumns: string[] = [
    'id',
    'fullname',
    'address',
    'name',
    'gallons',
    'mobile_number',
    'total',
    'status',
    'action',
  ];

  orders: MatTableDataSource<Orders>;

  constructor(
    private _dialog: MatDialog,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {
    this.orders = new MatTableDataSource<Orders>([]);
    this.getOrders();
  }
  getOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        console.log(this.orders);
        this.orders = new MatTableDataSource<Orders>(data);
      },
    });
  }

  ngOnInit(): void {
    this.getOrders();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orders.filter = filterValue.trim().toLowerCase();
  }

  openOrdersForm() {
    this._dialog.open(OrdersComponent, { height: '500px', width: '500px' });
  }
  updateOrder(orderID: number) {
    console.log(orderID);
    this.orderService.updateOrder(orderID).subscribe({
      next: (data) => {
        this.getOrders();
        this.toastr.success(data['message'] || 'Order Delivered');
      },
      error: (err) => {
        this.toastr.error(err['message'] || 'error updating order');
      },
    });
  }
}
