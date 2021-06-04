import { CartOperateService } from './services/cart-operate.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ArticlesComponent } from './articles/articles.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { SalesComponent } from './sales/sales.component';
import { ProfilComponent } from './profil/profil.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CustomerComponent } from './customer/customer.component';
import { PaymentComponent } from './payment/payment.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';
import { SalesDetailComponent } from './sales-detail/sales-detail.component';
import { SalesContentComponent } from './sales-content/sales-content.component';
import { SalesGeneralComponent } from './sales-general/sales-general.component';
import { SalesDailyComponent } from './sales-daily/sales-daily.component';

import { DataTablesModule } from 'angular-datatables';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderContentComponent } from './order-content/order-content.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ReservationManagementComponent } from './reservation-management/reservation-management.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FactureManagementComponent } from './facture-management/facture-management.component';
import { FactureDetailComponent } from './facture-detail/facture-detail.component';
import { InformationComponent } from './information/information.component';
import { StatisticComponent } from './statistic/statistic.component';

import { ChartModule } from 'angular2-chartjs';
import { EtatManagementComponent } from './etat-management/etat-management.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SidemenuComponent,
    ArticlesComponent,
    CheckoutComponent,
    CartComponent,
    SalesComponent,
    ProfilComponent,
    CustomerComponent,
    PaymentComponent,
    ScannerComponent,
    SalesDetailComponent,
    SalesContentComponent,
    SalesGeneralComponent,
    SalesDailyComponent,
    OrderComponent,
    OrderDetailComponent,
    OrderContentComponent,
    CustomerDetailComponent,
    ReservationManagementComponent,
    ReservationDetailComponent,
    ReservationComponent,
    FactureManagementComponent,
    FactureDetailComponent,
    InformationComponent,
    StatisticComponent,
    EtatManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    HttpClientModule,
    RouterModule,
    DataTablesModule,
    ChartModule
  ],
  providers: [
    AuthService,
    CartOperateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
