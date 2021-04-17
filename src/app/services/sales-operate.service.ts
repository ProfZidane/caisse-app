import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PdfService } from './pdf.service';

@Injectable({
  providedIn: 'root'
})
export class SalesOperateService {
getSalesURL = 'https://accessoire-mode.lce-test.fr/api/caisse/getVentesByCaissier/';
getSalesByYearURL = 'https://accessoire-mode.lce-test.fr/api/caisse/getOrderByYear/';
getSalesByMonthURL = 'https://accessoire-mode.lce-test.fr/api/caisse/getOrderByMounth/';
getSalesBetweenDateURL = 'https://accessoire-mode.lce-test.fr/api/caisse/getOrderBetweenTwoDate';
getSalesTodayURL = 'https://accessoire-mode.lce-test.fr/api/caisse/';
Sales;
dataToPdf;
  constructor(private http: HttpClient, private pdfService: PdfService) { }

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
        remise = object.reduction.value.toString() + ' Fcfa';
    } else {
      remise = 'aucune';
    }
    this.dataToPdf = {
      customer : object.client,
      vendeur : object.caissier,
      date : new Date().toLocaleDateString(),
      produit : objectProductPdf,
      total : object.total,
      remise : remise
    };

    console.log(this.dataToPdf);

    this.pdfService.generatePdf(this.dataToPdf);
  }


}
