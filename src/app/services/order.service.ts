import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
orders;
getURL = 'https://accessoire-mode.lce-test.fr/api/caisse/getAllOrders';
getByID = 'https://accessoire-mode.lce-test.fr/api/caisse/getOrderInfos/';
  constructor(private http: HttpClient) { }

  getAllOrder(): Observable<any> {
    return this.http.get(this.getURL);
  }

  getOrderDetail(id): Observable<any> {
    return this.http.get(this.getByID + id);
  }
}
