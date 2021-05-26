import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

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
      Authorization: 'Bearer ' + localStorage.getItem('word_token')
    });
    return headers;
  }
}
  getReservation(): Observable<any> {
    return this.http.get(this.getURL);
  }

  getDetailReservation(id): Observable<any> {
    return this.http.get(this.getByIdURL + id);
  }

  deleteProductReservation(idReservation, idProduct): Observable<any> {
    return this.http.get(this.deleteURL + idReservation + '/' + idProduct);
  }

  removeReservation(id): Observable<any> {
    return this.http.get(this.removeURL + id);
  }

  changeToOrders(num): Observable<any> {
    return this.http.get(this.changeURL + num);
  }
}
