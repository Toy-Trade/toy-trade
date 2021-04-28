import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToyButtonComponent } from './add-toy-button/add-toy-button.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [AddToyButtonComponent, DashboardComponent, LoginButtonComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    CommonModule,
    AddToyButtonComponent,
    DashboardComponent,
    LoginButtonComponent
  ]
})
export class SharedModule { }
