import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  UserForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.UserForm = this._fb.group({
      fullname: '',
      address: '',
      age: '',
      mobile_number: '',
      gender: '',
    });
  }

  ngOnInit(): void {
    this.UserForm.patchValue(this.data);
  }

  submitForm() {
    this.data.fullname = this.UserForm.value.fullname ?? '';
    this.data.address = this.UserForm.value.address ?? '';
    this.data.age = +this.UserForm.value.age ?? 0;
    this.data.mobile_number = this.UserForm.value.mobile_number ?? '';
    this.data.gender = this.UserForm.value.gender ?? '';
    this.updateData(this.data);
  }
  updateData(data: Users) {
    this.authService.updateUsers(data.id, data).subscribe({
      next: (data) => {
        this.toastr.success(data['message'] || 'Successfully Updated');
        this._dialogRef.close();
      },
      error: (err) => {
        this.toastr.error(err['message'] || 'unknown error');
      },
    });
  }
}
