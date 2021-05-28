import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
orders;
getURL = 'https://accessoiresmodes.com/api/caisse/getAllOrders';
getByID = 'https://accessoiresmodes.com/api/caisse/getOrderInfos/';
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
  getAllOrder(): Observable<any> {
    return this.http.get(this.getURL, { headers: this.getHeaders() });
  }

  getOrderDetail(id): Observable<any> {
    return this.http.get(this.getByID + id, { headers: this.getHeaders() });
  }
}
