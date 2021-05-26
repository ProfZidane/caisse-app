import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
orders;
getURL = 'https://accessoire-mode.lce-test.fr/api/caisse/getAllOrders';
getByID = 'https://accessoire-mode.lce-test.fr/api/caisse/getOrderInfos/';
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
  getAllOrder(): Observable<any> {
    return this.http.get(this.getURL);
  }

  getOrderDetail(id): Observable<any> {
    return this.http.get(this.getByID + id);
  }
}
