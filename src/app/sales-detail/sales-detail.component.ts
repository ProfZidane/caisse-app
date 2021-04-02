import { Component, OnInit } from '@angular/core';
import { SalesOperateService } from '../services/sales-operate.service';


@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.component.html',
  styleUrls: ['./sales-detail.component.css']
})
export class SalesDetailComponent implements OnInit {
option = 'Choisir ...';
month = 'Choisir ...';
year;
date: {
  caissier: 0,
  start_date: Date,
  end_date: Date
};
start_date;
end_date;
sales;
saleSelected;
loadingIndicator = false;
error = {
  loadingSale : false
};

  constructor(private salesService: SalesOperateService) {

   }

  ngOnInit(): void {
    this.GetSales();
  }



  OnChangeOption(event) {
    if (event.target.value === 'year') {
      this.option = 'year';
    } else if (event.target.value === 'month') {
      this.option = 'month';
    } else if (event.target.value === 'between') {
      this.option = 'between';
    }
  }

  GetSales() {
    const caissierInfo = JSON.parse(localStorage.getItem('caissier'));
    this.salesService.GetSalesByCaisser(Number(caissierInfo.id)).subscribe(
      (data) => {
        console.log(data);
        this.loadingIndicator = true;
        this.error.loadingSale = false;
        this.sales = data;

        this.saleSelected = this.sales[0];
        console.log(this.saleSelected);

      }, (err) => {
        console.log(err);
        this.loadingIndicator = true;
        this.error.loadingSale = true;
      }
    );
  }

  SelectedSale(object) {
    console.log(object);
    this.saleSelected = object;
  }

  SearchWithMonth() {
    console.log(this.month);
    const id = JSON.parse(localStorage.getItem('caissier')).id;
    this.salesService.GetSalesByMonth(id, this.month).subscribe(
      (data) => {
        console.log(data);
      }, (err) => {
        console.log(err);
      }
    );
  }

  SearchWithYear() {
    console.log(this.year);
    const id = Number(JSON.parse(localStorage.getItem('caissier')).id);
    this.salesService.GetSalesByYear(id, this.year).subscribe(
      (data) => {
        console.log(data);
      }, (err) => {
        console.log(err);
      }
    )
  }

  SearchBetweenDate() {
    console.log(this.start_date);
    console.log(this.end_date);
    let data = {
      caissier: Number(JSON.parse(localStorage.getItem('caissier')).id),
      start_date: this.start_date,
      end_date: this.end_date
    };
    console.log(data);
    this.salesService.GetSalesBetweenYear(data).subscribe(
      (data) => {
        console.log(data);
      }, (err) => {
        console.log(err);
      }
    );

  }


  GeneratePDF() {
    let data = {
      idOrder : this.saleSelected.order.order_number,
      produit : this.saleSelected.order.cart_info,
      caissier : JSON.parse(localStorage.getItem('caissier')).name,
      client : this.saleSelected.client,
      total : this.saleSelected.order.total_amount,
      reduction : this.saleSelected.order.coupon,
      date : this.saleSelected.order.created_at,
      payment : {
        type : this.saleSelected.order.payment_method
      }
    };
    this.salesService.GeneratePDFForSales(data);
  }

}
