import { ProfilComponent } from './profil/profil.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ArticlesComponent } from './articles/articles.component';
import { CustomerComponent } from './customer/customer.component';
import { ScannerComponent } from './scanner/scanner.component';
import { SalesComponent } from './sales/sales.component';
import { SalesDetailComponent } from './sales-detail/sales-detail.component';
import { SalesContentComponent } from './sales-content/sales-content.component';
import { SalesGeneralComponent } from './sales-general/sales-general.component';
import { SalesDailyComponent } from './sales-daily/sales-daily.component';
import { OrderComponent } from './order/order.component';
import { OrderContentComponent } from './order-content/order-content.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';


const routes: Routes = [
  {
    path : '',
    component : LoginComponent
  },
  {
    path : 'home',
    component : HomeComponent,
    children : [
      {
        path : '',
        component: ArticlesComponent,
        outlet: 'child1'
      },
      {
        path : 'customer',
        component : CustomerComponent,
        outlet: 'child1'
      },
      {
        path : 'scanner',
        component : ScannerComponent,
        outlet : 'child1'
      },
      {
        path: 'customer-history/:id',
        component: CustomerDetailComponent,
        outlet: 'child1'
      }
    ]
  },
  {
    path: 'sidebar',
    component: SidemenuComponent
  },
  {
    path : 'customer',
    component : ProfilComponent
  },
  {
    path : 'checkout/:mode/:num',
    component : CheckoutComponent
  },
  {
    path : 'sales',
    component : SalesComponent,
    children : [
      {
        path : 'sales-group',
        component : SalesDetailComponent,
        outlet : 'child2',
        children: [
          {
            path: 'pp',
            component: SalesGeneralComponent,
            outlet: 'child21'
          },
          {
            path: '',
            component: SalesContentComponent,
            outlet: 'child21'
          },
          {
            path: 'sales-daily',
            component: SalesDailyComponent,
            outlet: 'child21'
          }
        ]
      }
    ]
  },
  {
    path: 'order',
    component: OrderComponent,
    children: [
      {
        path: '',
        component: OrderContentComponent,
        outlet: 'child3'
      },
      {
        path: 'order-detail/:id',
        component: OrderDetailComponent,
        outlet: 'child3'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
