import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
Users = [
  {
    name : 'Mohamed zidane',
    email : 'madazada0@gmail.com',
    tel : '+225 0779261619'
  },
  {
    name : 'Mohamed Fahd',
    email : 'fahd.mohamed@gmail.com',
    tel : '+225 0101721585'
  }
];

Customer = [
  {
    id : 1,
    name : 'Mohamed zidane',
    email : 'madazada0@gmail.com',
    tel : '+225 0779261619'
  },
  {
    id : 2,
    name : 'Mohamed Fahd',
    email : 'fahd.mohamed@gmail.com',
    tel : '+225 0101721585'
  },
  {
    id : 3,
    name : 'Kone Sydney',
    email : 'k.sydney@gmail.com',
    tel : '+225 4585455823'
  },
  {
    id : 4,
    name : 'Kouame thierry',
    email : 'k.th@gmail.com',
    tel : '+225 45454545455'
  }
];
  constructor(private s: MatSnackBar) { }


  GetCustomer() {
    let customers = this.Customer;
    return customers;
  }

  SelectCustomer(id) {
    let customer_select;
    this.Customer.forEach(element => {
      if (element.id === id) {
        customer_select = element;
      }
    });
    return customer_select;
  }

  ChoicingCustomer(object) {
    localStorage.setItem('customerChoice', JSON.stringify(object));
    this.s.open('Nouveau Client ajouté à la commande !', 'OK');
  }

  GetSelectedCustomer() {
    let cc = JSON.parse(localStorage.getItem('customerChoice'));
    return cc;
  }

  AddNewCustomer(object) {
    this.Customer.push(object);
    this.Customer.reverse();
  }
}
