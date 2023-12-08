import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFormComponent } from './order-form.component';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: "",
    component: OrderFormComponent,
  }
]

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class OrderFormRoutingModule { }
