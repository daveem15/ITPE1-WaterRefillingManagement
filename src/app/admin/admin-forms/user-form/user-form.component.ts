import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit{
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

ngOnInit(): void {
  this.UserForm.patchValue(this.data);
}

 submitForm(){
  console.log(this.UserForm.value);
 }
}
