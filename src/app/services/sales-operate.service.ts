import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PdfService } from './pdf.service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SalesOperateService {
getSalesURL = 'https://accessoire-mode.lce-test.fr/api/caisse/getVentesByCaissier/';
getSalesByYearURL = 'https://accessoire-mode.lce-test.fr/api/caisse/getOrderByYear/';
getSalesByMonthURL = 'https://accessoire-mode.lce-test.fr/api/caisse/getOrderByMounth/';
getSalesBetweenDateURL = 'https://accessoire-mode.lce-test.fr/api/caisse/getOrderBetweenTwoDate';
getSalesTodayURL = 'https://accessoire-mode.lce-test.fr/api/caisse/getNowSales/';
getSalesByCustomerURL = 'https://accessoire-mode.lce-test.fr/api/caisse/getHistoriqueAchatsClient/';
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
      Authorization: 'Bearer ' + localStorage.getItem('word_token')
    });
    return headers;
  }
}
  GetSalesByCaisser(id): Observable<any> {
    return this.http.get(this.getSalesURL + id);
  }

  GetSalesByMonth(id, month): Observable<any> {
    return this.http.get(this.getSalesByMonthURL + id + '/' + month);
  }

  GetSalesByYear(id, year): Observable<any> {
    return this.http.get(this.getSalesByYearURL + id + '/' + year);
  }

  GetSalesBetweenYear(data): Observable<any> {
    return this.http.post(this.getSalesBetweenDateURL, data);
  }


  GetSalesToday(id): Observable<any> {
    return this.http.get(this.getSalesTodayURL + id);
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
    return this.http.get(this.getSalesByCustomerURL + id);
  }

  GetDetailHistory(id): Observable<any> {
    return this.http.get(this.getInfoSalesByCustomerURL + id);
  }


  GetSalesEchelonne(): Observable<any> {
    return this.http.get(this.echelonneURL);
  }

  GetSalesPaidEchelonne(): Observable<any> {
    return this.http.get(this.echelonnePaidURL);
  }

  GetDetailSalesEchelonne(id): Observable<any> {
    return this.http.get(this.echelonneDetailURL + id);
  }



  SetNewPriceEchelonne(price): Observable<any> {
    return this.http.post(this.echellonePostURL, price);
  }


  SetProductToStock(data): Observable<any> {
    return this.http.post(this.backStockProductURL, data);
  }
}
