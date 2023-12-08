import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  UserForm : FormGroup;
 
  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<UserFormComponent>,
   @Inject(MAT_DIALOG_DATA) public data : any){
   this.UserForm = this._fb.group({
     name: '',
     address: '',
     age: '',
     number: '',
     gender: ''
   })
  }
}
