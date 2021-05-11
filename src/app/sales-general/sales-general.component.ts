import { Component, Input, OnInit } from '@angular/core';
import { SalesOperateService } from '../services/sales-operate.service';
import { Subject } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-sales-general',
  templateUrl: './sales-general.component.html',
  styleUrls: ['./sales-general.component.css']
})
export class SalesGeneralComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  sales;
  loadingIndicator = false;
  error = {
    loadingSale : false,
  };
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  visibility = true;
  constructor(private salesService: SalesOperateService) { }

  ngOnInit(): void {
    this.GetSales();
    this.dtOptions = {
      ordering: false
    };
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  GetSales() {
    this.dtOptions = {
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'colvis',
        'copy',
        'print',
        'excel',
      ]
    };
    const caissierInfo = JSON.parse(localStorage.getItem('caissier'));
    this.salesService.GetSalesByCaisser(Number(caissierInfo.id)).subscribe(
      (data) => {
        console.log(data);
        this.error.loadingSale = false;
        this.sales = data;
        this.dtTrigger.next();
        this.visibility = false;
      }, (err) => {
        console.log(err);
        this.error.loadingSale = true;
        this.visibility = false;
      }
    );
  }

}
