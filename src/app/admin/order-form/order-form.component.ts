import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersComponent } from '../admin-forms/orders/orders.component';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationsComponent } from '../admin-forms/notifications/notifications.component';
import { UserFormComponent } from '../admin-forms/user-form/user-form.component';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  displayedColumns: string[] = ['name', 'address','order', 'gallons', 'number', 'price', 'action'];
   dataSource = new MatTableDataSource(
    [
      { name: 'David Mirano', address: 'Betes, Aliaga, Nueva Ecija', order: 'Distilled', gallons:'1', number: '09208465788', price: '20.00'},
      { name: 'John Vincent Feliciano', address: 'Bongabon, Nueva Ecija', order: 'Alkaline', gallons:'2', number: '09292921902', price: '40.00'},
    ]);

  constructor(private _dialog : MatDialog){

  }

ngOnInit(): void {
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  openOrdersForm(){
    this._dialog.open(OrdersComponent,{height: "500px", width:"500px"});
  }
  openEditUserForm(data : any){
    const dialogRef = this._dialog.open(OrdersComponent, {data});
   console.log(data);
  }
  }


export interface PeriodicElement {
  name: string;
  address: string;
  order: string;
  number: number;
  price: number;
}

  
  
