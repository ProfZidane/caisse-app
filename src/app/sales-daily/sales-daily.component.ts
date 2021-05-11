import { Component, OnInit } from '@angular/core';
import { SalesOperateService } from '../services/sales-operate.service';
import { Subject } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-sales-daily',
  templateUrl: './sales-daily.component.html',
  styleUrls: ['./sales-daily.component.css']
})
export class SalesDailyComponent implements OnInit {
id;
salesDaily;
visibility = true;
dtTrigger: Subject<any> = new Subject<any>();
dtOptions: any = {};
quantitySum = 0;
subTotal = 0;
total = 0;
  constructor(private salesService: SalesOperateService) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('caissier')).id;
    this.getSales();
  }

  getSales() {
    this.salesService.GetSalesToday(this.id).subscribe(
      (data) => {
        console.log(data);
        this.salesDaily = data;
        data.forEach(element => {
          if (element.order.quantity !== null) {
            this.quantitySum += element.order.quantity;
          }
          if (element.order.sub_total !== null) {
            this.subTotal += element.order.sub_total;
          }
          if (element.order.total_amount !== null) {
            this.total += element.order.total_amount;
          }
        });
        console.log(this.quantitySum);
        console.log(this.total);
        console.log(this.subTotal);

        this.dtTrigger.next();
        this.visibility = false;
      }, (err) => {
        console.log(err);
        this.visibility = false;
      }
    )
  }

}
