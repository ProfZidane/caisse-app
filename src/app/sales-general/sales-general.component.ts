import { Component, Input, OnInit } from '@angular/core';
import { SalesOperateService } from '../services/sales-operate.service';
import { Subject } from 'rxjs';

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

  constructor(private salesService: SalesOperateService) { }

  ngOnInit(): void {
    this.GetSales();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  GetSales() {
    const caissierInfo = JSON.parse(localStorage.getItem('caissier'));
    this.salesService.GetSalesByCaisser(Number(caissierInfo.id)).subscribe(
      (data) => {
        console.log(data);
        this.loadingIndicator = true;
        this.error.loadingSale = false;
        this.sales = data;
        this.dtTrigger.next();

      }, (err) => {
        console.log(err);
        this.loadingIndicator = true;
        this.error.loadingSale = true;
      }
    );
  }

}
