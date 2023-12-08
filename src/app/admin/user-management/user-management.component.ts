import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../admin-forms/user-form/user-form.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { NotificationsComponent } from '../admin-forms/notifications/notifications.component';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})


export class UserManagementComponent implements OnInit{
 
  displayedColumns: string[] = ['name', 'address','age', 'number', 'gender', 'action'];
   dataSource = new MatTableDataSource(
    [
      { name: 'David Mirano', address: 'Aliaga, Nueva Ecija', age:'20', number: '09554267060', gender: 'Male'},
      { name: 'Elijah Justo', address: 'San Jose, Nueva Ecija', age:'21', number: '09203020202', gender: 'Female'},
      { name: 'John Vincent Feliciano', address: 'Bongabon, Nueva Ecija', age:'21', number: '09558647891', gender: 'Male'},
    ]);

  constructor(private _dialog : MatDialog){

  }

ngOnInit(): void {
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  openUserForm(){
    this._dialog.open(UserFormComponent,{height: "500px", width:"500px"});
  }
  openEditUserForm(data : any){
    const dialogRef = this._dialog.open(UserFormComponent, {data});
   console.log(data);
  }
  openDeleteUser(data : any ) {
    this._dialog.open(NotificationsComponent,{data});
    console.log(data);
  }
  }


export interface PeriodicElement {
  name: string;
  address: string;
  age: number;
  number: number;
  gender: string;
}
