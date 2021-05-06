import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CryptoService } from './crypto.service';

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
customerURl = 'https://accessoire-mode.lce-test.fr/api/caisse/getAllClients';
createCustomerURL = 'https://accessoire-mode.lce-test.fr/api/caisse/createUser';
authURL = 'https://accessoire-mode.lce-test.fr/api/connexion';
CustomerChoice;
  constructor(private s: MatSnackBar, private http: HttpClient, private cryptoService: CryptoService) { }

  AuthentificationByEmail(data): Observable<any> {
    return this.http.post(this.authURL, data);
  }

  GetCustomer(): Observable<any> {
    // let customers = this.Customer;
    return this.http.get(this.customerURl);
  }

  ChoicingCustomer(object) {
    localStorage.setItem('customerChoice', JSON.stringify(object));
    this.s.open('Nouveau Client ajouté à la commande !', 'OK');
  }


  // Récupérer le client en pleine session
  GetSelectedCustomer() {
    this.CustomerChoice = JSON.parse(localStorage.getItem('customerChoice'));
    return this.CustomerChoice;
  }

  AddNewCustomer(object): Observable<any> {
    /*this.Customer.push(object);
    this.Customer.reverse();*/
    return this.http.post(this.createCustomerURL, object);
  }
}
