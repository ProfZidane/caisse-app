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
    path : 'checkout',
    component : CheckoutComponent
  },
  {
    path : 'sales',
    component : SalesComponent,
    children : [
      {
        path : '',
        component : SalesDetailComponent,
        outlet : 'child2'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
