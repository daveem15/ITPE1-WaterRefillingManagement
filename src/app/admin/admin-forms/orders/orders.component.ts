import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  OrdersForm : FormGroup;
 
  constructor(private _fb : FormBuilder){
   this.OrdersForm = this._fb.group({
     TypeofWater: '',
     NumberofGallons: '',
   })
  }
  submitForm(){
   console.log(this.OrdersForm.value);
  }
 }
 
