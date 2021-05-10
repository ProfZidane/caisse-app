import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
