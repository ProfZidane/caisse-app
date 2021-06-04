import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PdfService } from './pdf.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesOperateService {
getSalesURL = environment.url + 'getVentesByCaissier/';
getSalesByYearURL = environment.url + 'getOrderByYear/';
getSalesByMonthURL = environment.url + 'getOrderByMounth/';
getSalesBetweenDateURL = environment.url + 'getOrderBetweenTwoDate';
getSalesTodayURL = environment.url + 'getNowSales/';
getSalesByCustomerURL = environment.url + 'getHistoriqueAchatsClient/';
getInfoSalesByCustomerURL = environment.url + 'getAchatsClientCartInfo/';
echelonneURL = environment.url + 'getFacturesImpayes';
echelonnePaidURL = environment.url + 'getFacturesPayes';
echelonneDetailURL = environment.url + 'getFacturesImpayesDetails/';
echellonePostURL = environment.url + 'storePayement';
backStockProductURL = environment.url + 'storeRetours';
Sales;
dataToPdf;
  constructor(private http: HttpClient, private pdfService: PdfService) { }

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
  GetSalesByCaisser(id): Observable<any> {
    return this.http.get(this.getSalesURL + id, { headers: this.getHeaders() });
  }

  GetSalesByMonth(id, month): Observable<any> {
    return this.http.get(this.getSalesByMonthURL + id + '/' + month, { headers: this.getHeaders() });
  }

  GetSalesByYear(id, year): Observable<any> {
    return this.http.get(this.getSalesByYearURL + id + '/' + year, { headers: this.getHeaders() });
  }

  GetSalesBetweenYear(data): Observable<any> {
    return this.http.post(this.getSalesBetweenDateURL, data, { headers: this.getHeaders() });
  }


  GetSalesToday(id): Observable<any> {
    return this.http.get(this.getSalesTodayURL + id, { headers: this.getHeaders() });
  }

  GeneratePDFForSales(object) {
    console.log(object);
    const objectProductPdf = [];
    let remise = '';
    object.produit.forEach(elt => {
      let newObject = [
        {
          border : [false, false, false, false],
          text : elt.quantity.toString(),
          fontSize : 8,
          alignment : 'center',
        },
        {
          border : [false, false, false, false],
          text : elt.title,
          fontSize : 8,
          alignment : 'center',
        },
        {
          border : [false, false, false, false],
          text : elt.price.toString(),
          fontSize : 8,
          alignment : 'center',
        },
        {
          border : [false, false, false, false],
          text : elt.amount.toString(),
          fontSize : 8,
          alignment : 'center',
        }
      ];
      objectProductPdf.push(newObject);
    });
    console.log(objectProductPdf);
    if (object.reduction !== null) {
        remise = object.reduction.toString() + ' Fcfa';
    } else {
      remise = 'aucune';
    }
    this.dataToPdf = {
      customer : object.client,
      vendeur : object.caissier,
      date : new Date().toLocaleDateString(),
      produit : objectProductPdf,
      sub_total: object.subTotal.toString(),
      total : object.total,
      montant_recu: object.montant_recu,
      exchange:  object.exchange,
      remise: remise
    };

    console.log(this.dataToPdf);

    this.pdfService.generatePdf(this.dataToPdf);
  }


  GetHistorySaleByCustomer(id): Observable<any> {
    return this.http.get(this.getSalesByCustomerURL + id, { headers: this.getHeaders() });
  }

  GetDetailHistory(id): Observable<any> {
    return this.http.get(this.getInfoSalesByCustomerURL + id, { headers: this.getHeaders() });
  }


  GetSalesEchelonne(): Observable<any> {
    return this.http.get(this.echelonneURL, { headers: this.getHeaders() });
  }

  GetSalesPaidEchelonne(): Observable<any> {
    return this.http.get(this.echelonnePaidURL, { headers: this.getHeaders() });
  }

  GetDetailSalesEchelonne(id): Observable<any> {
    return this.http.get(this.echelonneDetailURL + id, { headers: this.getHeaders() });
  }



  SetNewPriceEchelonne(price): Observable<any> {
    return this.http.post(this.echellonePostURL, price, { headers: this.getHeaders() });
  }


  SetProductToStock(data): Observable<any> {
    return this.http.post(this.backStockProductURL, data, { headers: this.getHeaders() });
  }
}
