import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToyButtonComponent } from './add-toy-button/add-toy-button.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToyCardComponent } from './toy-card/toy-card.component';
import { ToyInfoModalComponent } from './toy-info-modal/toy-info-modal.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NotificationsCardComponent } from './notifications-card/notifications-card.component';
import { ConfirmTransactionModalComponent } from './confirm-transaction-modal/confirm-transaction-modal.component';
import { ViewTransactionModalComponent } from './view-transaction-modal/view-transaction-modal.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddToyButtonComponent, DashboardComponent, ToyCardComponent, ToyInfoModalComponent, SearchBarComponent, NotificationsCardComponent, ConfirmTransactionModalComponent, ViewTransactionModalComponent, LoginButtonComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    AddToyButtonComponent,
    DashboardComponent,
    ToyCardComponent,
    ToyInfoModalComponent,
    SearchBarComponent,
    NotificationsCardComponent,
    ConfirmTransactionModalComponent,
    ViewTransactionModalComponent,
    LoginButtonComponent
  ]
})
export class SharedModule { }
