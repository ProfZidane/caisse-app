import { NgForm } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
Customers;
Customer_selected;
success;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.Customers = this.authService.GetCustomer().reverse();
    console.log(this.Customers);
  }


  selectCustomer(id) {
    let customer_selected = this.authService.SelectCustomer(id);
    this.Customer_selected = customer_selected;
  }

  ChoiceCustomer() {
    this.authService.ChoicingCustomer(this.Customer_selected);
  }

  onSubmit(f: NgForm) {
    this.success = false;
    console.log(f.value);
    let last_id = this.Customers[this.Customers.length - 1].id;
    console.log(last_id);
    let data = {
      id : Number(last_id + 1),
      name : f.value.nom + ' ' + f.value.prenom,
      email : f.value.email,
      tel : f.value.tel
    };
    this.authService.AddNewCustomer(data);
    setInterval( () => {
      this.success = true;
    }, 2000);
  }

}
