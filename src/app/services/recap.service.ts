import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecapService {

  getURL = environment.url + 'getRapportDuJour';
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

  getRapport(): Observable<any> {
    return this.http.get(this.getURL, { headers: this.getHeaders() });
  }
}
