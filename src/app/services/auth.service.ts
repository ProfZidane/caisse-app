import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
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
customerURl = 'http://192.168.1.120:8000/api/caisse/getAllClients';
  constructor(private s: MatSnackBar, private http: HttpClient) { }


  GetCustomer(): Observable<any>{
    // let customers = this.Customer;
    return this.http.get(this.customerURl);
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
