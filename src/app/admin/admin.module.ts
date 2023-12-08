import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserFormComponent } from './admin-forms/user-form/user-form.component';
import { OrdersComponent } from './admin-forms/orders/orders.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationsComponent } from './admin-forms/notifications/notifications.component';
import { MatBadgeModule } from '@angular/material/badge'; 

@NgModule({
  declarations: [
    AdminComponent,
    UserFormComponent,
    OrdersComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatBadgeModule
  ]
})
export class AdminModule { }
