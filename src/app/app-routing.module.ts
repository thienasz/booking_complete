import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { UnauthenticatedGuard } from './unauthenticated.guard';
import {BookingAddComponent} from "./booking/add/booking.add.component";
import {BookingListComponent} from "./booking/list/booking.list.component";

const routes: Routes = [
  {
    path: '',
    component: BookingAddComponent
  },
  {
    path: 'dashboard',
    component: BookingListComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UnauthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [LoginComponent, RegisterComponent];
