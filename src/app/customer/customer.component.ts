import { NgForm } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
Customers;
CustomersBase;
Customer_selected;
success;
error = {
  errorInsertion: ''
};
validationMessage;
search;
numberCase = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', ' '];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.GetCustomer().subscribe(
      (data) => {
        console.log(data);
        this.Customers = data;
        this.Customers.reverse();
        this.CustomersBase = data;
      }, (err) => {
        console.log(err);
      }
    );
  }


  getNewCustomer() {
    this.authService.GetCustomer().subscribe(
      (data) => {
        console.log(data);
        this.Customers = data;
        this.Customers.reverse();
        this.CustomersBase = data;
      }, (err) => {
        console.log(err);
      }
    );
  }

  selectCustomer(object) {
    // console.log(object);
    this.Customer_selected = object;
  }

  ChoiceCustomer() {
    this.authService.ChoicingCustomer(this.Customer_selected);
  }

  onSubmit(f: NgForm) {
    this.success = false;
    this.error.errorInsertion = '';
    this.validationMessage = '';
    console.log(f.value);
    const data = {
      name : f.value.nom + ' ' + f.value.prenom,
      email : f.value.email,
      telephone : f.value.tel,
      type : f.value.type_client,
      birthday : f.value.date_naissance
    };
    console.log(data);

    this.authService.AddNewCustomer(data).subscribe(
      (data) => {
        setTimeout( () => {
          this.success = true;
          if (data.state === false && data.message === 'Ce client existe dans la base !') {
            this.error.errorInsertion = '400';
          } else if (data.state === false && data.message === 'Erreur !') {
            this.error.errorInsertion = '500';
          } else if (data.state === true) {
            this.validationMessage = 'Client bien enregistré dans notre boutique !';
            this.getNewCustomer();
          }
        }, 2000);
        console.log(data);

      }, (err) => {
        setTimeout( () => {
          this.success = true;
          this.error.errorInsertion = '500';
        }, 2000);
      }
    );
  }


  FilterString(array, text) {
    const filteredCart = array.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()));
    // console.log(filteredCart);
    return filteredCart;

  }

  FilterNumber(array, text) {
    // tslint:disable-next-line:max-line-length
    console.log(text);

    // tslint:disable-next-line:max-line-length
    const filteredCart = array.filter((item) => (item.telephone !== null) ? item.telephone.includes(text) : console.log('null'));
    return filteredCart;
  }


  OnResearch(event) {
    console.log(event.target.value[event.target.value.length - 1]);

    if (event === '') {
      this.Customers = this.CustomersBase;
    // tslint:disable-next-line:max-line-length
    } else if (this.numberCase.includes(event.target.value) || this.numberCase.includes(event.target.value[event.target.value.length - 1])) {
      this.Customers = this.FilterNumber(this.CustomersBase, event.target.value);
    } else {
      this.Customers = this.FilterString(this.CustomersBase, event.target.value);
    }
  }


  History(id) {
    this.router.navigateByUrl('/home/(child1:customer-history/' + id + ';open=true)');
  }

  selectCountry(event) {
    console.log(event.target.value);
  }

}
