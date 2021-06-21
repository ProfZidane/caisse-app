import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
getURL = environment.url + 'getAllReservations';
getByIdURL = environment.url + 'getDetailsReservation/';
deleteURL = environment.url + 'retirerProductInReservation/';
removeURL = environment.url + 'cancelReservation/';
changeURL = environment.url + 'changeToOrder/';
  constructor(private http: HttpClient) { }

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
  getReservation(): Observable<any> {
    return this.http.get(this.getURL, { headers: this.getHeaders() });
  }

  getDetailReservation(id): Observable<any> {
    return this.http.get(this.getByIdURL + id, { headers: this.getHeaders() });
  }

  deleteProductReservation(idReservation, idProduct): Observable<any> {
    return this.http.get(this.deleteURL + idReservation + '/' + idProduct, { headers: this.getHeaders() });
  }

  removeReservation(id): Observable<any> {
    return this.http.get(this.removeURL + id, { headers: this.getHeaders() });
  }

  changeToOrders(num): Observable<any> {
    return this.http.get(this.changeURL + num, { headers: this.getHeaders() });
  }
}
