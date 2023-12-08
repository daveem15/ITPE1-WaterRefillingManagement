import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: "admin",
    loadChildren: ()=> import('./admin/admin.module').then(mod => mod.AdminModule)
  },
  {
    path: "login",
    loadChildren: ()=> import('./login/login.module').then(mod => mod.LoginModule)
  },
  {
    path: "register",
    loadChildren: ()=> import('./register/register.module').then(mod => mod.RegisterModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }