import { Injectable } from '@angular/core';
import { endpoint } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
getURL = endpoint.url + 'getAllReservations';
getByIdURL = endpoint.url + 'getDetailsReservation/';
deleteURL = endpoint.url + 'retirerProductInReservation/';
removeURL = endpoint.url + 'cancelReservation/';
changeURL = endpoint.url + 'changeToOrder/';
  constructor(private http: HttpClient) { }

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
