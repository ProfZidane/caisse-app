import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PdfService } from './pdf.service';
import { environment } from '../../environments/environment';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
etatReservationURL = environment.url + 'getEtatReservations';
getSalesPFPURL = environment.url + 'getDetailVentesParFactureSurPeriode/';
getCumulSalesBFURL = environment.url + 'getCumulVentesParFactureSurPeriode/';
getCumulSalesBCURL = environment.url + 'getCumulVentesParClientSurPeriode/';
getEtatReglementURL = environment.url + 'getEtatReglementsSurPeriode/';
getEtatCompteCustomerBDFURL = environment.url + 'getEtatComptesClientsParDateFin/';
getSalesBAURL = environment.url + 'getVentesParArticleSurPeriode/';

getSalesYearURL = environment.url + 'income';
  constructor(private http: HttpClient) { }
  getHeaders() {
    if (localStorage.getItem('word_token') !== null) {
      const headers = new HttpHeaders({
        'Content-type' : 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('word_token')).token
      });
      return headers;
    }
  }

  getReservations(): Observable<any> {
    return this.http.get(this.etatReservationURL, { headers: this.getHeaders() });
  }

  getDetailSalesByFacturesOnTime(data): Observable<any> {
    return this.http.get(this.getSalesPFPURL + data.dd + '/' + data.df, { headers: this.getHeaders() });
  }

  getCumulSalesByFactureOnTime(data): Observable<any> {
    return this.http.get(this.getCumulSalesBFURL + data.dd + '/' + data.df, { headers: this.getHeaders() });
  }

  getCumulSalesByCustomerOnTime(data): Observable<any> {
    return this.http.get(this.getCumulSalesBCURL + data.dd + '/' + data.df, { headers: this.getHeaders() });
  }

  getEtatReglementOnTime(data): Observable<any> {
    return this.http.get(this.getEtatReglementURL + data.dd + '/' + data.df, { headers: this.getHeaders() });
  }

  getEtatAccountByEndTime(data): Observable<any> {
    return this.http.get(this.getEtatCompteCustomerBDFURL + data.df, { headers: this.getHeaders() });
  }

  getSalesByArticlesOnTIme(data): Observable<any> {
    return this.http.get(this.getSalesBAURL + data.dd + '/' + data.df, { headers: this.getHeaders() });
  }

  getSalesOfYear(): Observable<any> {
    return this.http.get(this.getSalesYearURL, { headers: this.getHeaders() });
  }
}
