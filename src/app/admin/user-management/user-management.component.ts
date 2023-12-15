import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../admin-forms/user-form/user-form.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NotificationsComponent } from '../admin-forms/notifications/notifications.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'address',
    'age',
    'number',
    'gender',
    'action',
  ];
  users: MatTableDataSource<Users>;

  constructor(
    private _dialog: MatDialog,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.users = new MatTableDataSource<Users>([]);
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.authService.getAllUsers().subscribe({
      next: (data) => {
        this.users = new MatTableDataSource<Users>(data);
      },
      error: (err) => {
        this.toastr.error(err['message'] || 'unknown error');
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  openUserForm() {
    this._dialog.open(UserFormComponent, { height: '500px', width: '500px' });
  }
  openEditUserForm(data: Users) {
    const dialogRef = this._dialog.open(UserFormComponent, { data });
    console.log(data);
  }
  openDeleteUser(data: Users) {
    this._dialog.open(NotificationsComponent, { data });
    console.log(data);
  }
}
