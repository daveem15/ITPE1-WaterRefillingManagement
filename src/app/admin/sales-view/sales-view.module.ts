import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesViewComponent } from './sales-view.component';
import { SalesViewRoutingModule } from './sales-view-routing.module';



@NgModule({
  declarations: [
    SalesViewComponent
  ],
  imports: [
    CommonModule,
    SalesViewRoutingModule,
  ]
})
export class SalesViewModule { }
