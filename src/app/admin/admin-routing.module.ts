import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: ()=>import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)
      },
      {
        path: "user-management",
        loadChildren: ()=>import('./user-management/user-management.module').then(mod => mod.UserManagementModule)
      },
      {
        path: "sales-view",
        loadChildren: ()=>import('./sales-view/sales-view.module').then(mod => mod.SalesViewModule)
      },
      {
        path: "order-form",
        loadChildren: ()=>import('./order-form/order-form.module').then(mod => mod.OrderFormModule)
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
