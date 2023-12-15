import { ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesViewComponent } from './sales-view.component';
import { SalesViewRoutingModule } from './sales-view-routing.module';
import { OrderService } from 'src/app/services/order.service';
import { ProductSales } from 'src/app/models/sales_per_product';

@NgModule({
  declarations: [SalesViewComponent],
  imports: [CommonModule, SalesViewRoutingModule],
})
export class SalesViewModule {
  constructor() {}
}
