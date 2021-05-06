import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesOperateService } from '../services/sales-operate.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
id;
loading = {
  data: true
};
error = {
  data: false,
  text: 'Une erreur est survenue. Veuillez réessayer plus tard svp !'
};
sales;
dtTrigger: Subject<any> = new Subject<any>();
dtOptions: any = {};
  constructor(private salesService: SalesOperateService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params => {
        this.id = params.get('id');
      })
    );
    console.log(this.id);

    this.GetSalesByCustomer();
  }

  GetSalesByCustomer() {
    this.error.data = false;
    this.salesService.GetHistorySaleByCustomer(this.id).subscribe(
      (data) => {
        console.log(data);
        this.sales = data;
        this.loading.data = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.loading.data = false;
        this.error.data = true;
      }
    );
  }

  goProduct(id) {
    console.log(id);
  }

}
