import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { Users } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  UserForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    public _dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.UserForm = this._fb.group({
      name: '',
      address: '',
      age: '',
      number: '',
      gender: '',
    });
  }
  delete(id: number) {
    this.authService.deleteUser(id).subscribe({
      next: (data) => {
        this.toastr.success(data['message'] || 'Successfully Deleted');
        this._dialogRef.close();
      },
      error: (err) => {
        this.toastr.error(err['message'] || 'unknown error');
      },
    });
  }
}
