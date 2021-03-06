import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
customerURl = environment.url + 'getAllClients';
createCustomerURL = environment.url + 'createUser';
authURL = environment.endPoint + 'connexion';
logoutURL = environment.endPoint + 'logout';
CustomerChoice;
  constructor(private s: MatSnackBar, private http: HttpClient, private cryptoService: CryptoService) { }

  // get token and set this in headers
  getHeaders() {
    if (localStorage.getItem('word_token') !== null) {
      const headers = new HttpHeaders({
        'Content-type' : 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('word_token')).token
      });
      return headers;
    }
  }

  AuthentificationByEmail(data): Observable<any> {
    return this.http.post(this.authURL, data, { headers: this.getHeaders() });
  }

  Logout(): Observable<any> {
    return this.http.post(this.logoutURL, { headers: this.getHeaders() });
  }

  GetCustomer(): Observable<any> {
    // let customers = this.Customer;
    return this.http.get(this.customerURl, { headers: this.getHeaders() });
  }

  ChoicingCustomer(object) {
    localStorage.setItem('customerChoice', JSON.stringify(object));
    this.s.open('Nouveau Client ajout?? ?? la commande !', 'OK');
  }


  // R??cup??rer le client en pleine session
  GetSelectedCustomer() {
    this.CustomerChoice = JSON.parse(localStorage.getItem('customerChoice'));
    return this.CustomerChoice;
  }

  AddNewCustomer(object): Observable<any> {
    /*this.Customer.push(object);
    this.Customer.reverse();*/
    return this.http.post(this.createCustomerURL, object, { headers: this.getHeaders() });
  }
}
