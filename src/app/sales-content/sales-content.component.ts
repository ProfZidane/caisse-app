import { Component, OnInit } from '@angular/core';
import { SalesOperateService } from '../services/sales-operate.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-sales-content',
  templateUrl: './sales-content.component.html',
  styleUrls: ['./sales-content.component.css']
})
export class SalesContentComponent implements OnInit {
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
    loadingSale : false,
    loadingCaissier: false
  };

  warning = {
    messageEmptySearch: false
  };

  caissier;
  caissiers;
  option2 = 'Choisir ...';
  user;
  data = {
    caissier: '',
    trier_par: null,
    mois: {
      state: false,
      value: ''
    },
    annee: {
      state: false,
      value: ''
    },
    date_debut: {
      state: false,
      value: ''
    }, 
    date_fin: {
      state: false,
      value: ''
    }
  };
  constructor(private salesService: SalesOperateService) {
    if (localStorage.getItem('caissier') !== null) {
      this.user = JSON.parse(localStorage.getItem('caissier'));
      if (this.user.role === 'admin' && this.user.is_manager === 1) {
        this.data.caissier = 'all';
        this.caissier = null;
      } else {
        this.option2 = null;
        this.caissier = JSON.parse(localStorage.getItem('caissier')).id;
      }
    }
  }

 ngOnInit(): void {
   if (this.user.role === 'admin') {
    this.GetCaisser();
    this.GetRealSales();
   } else {
    this.GetSales();
   }
 }



 OnChangeOption(event) {
   if (event.target.value === 'year') {
     this.option = 'year';
     if (this.user.role === 'admin') {
      this.data.trier_par = 'annee';
      this.data.annee.state = true;
      this.data.mois.state = false;
      this.data.date_debut.state = false;
      this.data.date_fin.state = false;
     }
   } else if (event.target.value === 'month') {
     this.option = 'month';
     if (this.user.role === 'admin') {
      this.data.trier_par = 'mois';
      this.data.annee.state = false;
      this.data.mois.state = true;
      this.data.date_debut.state = false;
      this.data.date_fin.state = false;
     }
   } else if (event.target.value === 'between') {
     this.option = 'between';
     if (this.user.role === 'admin') {
      this.data.trier_par = 'intervalle';
      this.data.annee.state = false;
      this.data.mois.state = false;
      this.data.date_debut.state = true;
      this.data.date_fin.state = true;
     }
   }
 }

 OnChangeCaissier(event) {
   if (event.target.value !== 'Tous les caissiers' || event.target.value !== null) {
    console.log("all not not is it");

    this.data.caissier = event.target.value;
    this.sales =  [];
    this.GetRealSales();
   } else {
     console.log('is it all');
     
     this.data.caissier = 'all';
     this.sales =  [];
     this.GetRealSales();
   }
 }

 GetCaisser() {
   this.error.loadingCaissier = false;
   this.salesService.GetCaisser().subscribe(
     (data) => {
       console.log(data);
      this.caissiers = data;
      this.caissier = 'Choisir ...';
     }, (err) => {
       console.log(err);
      this.error.loadingCaissier = true;
     }
   )
 }


 GetRealSales() {
   // { caissier: 'all | id', trier_par: 'annee | mois | intervalle', v}
   this.loadingIndicator = false;
   this.error.loadingSale = false;
   this.warning.messageEmptySearch = false;
  if (this.data.caissier === '' || this.data.caissier === null) {
    
    const send = {
      caissier: 'all',
      trier_par: this.data.trier_par
    };
    this.salesService.GetVentes(send).subscribe(
      (data) => {
        console.log(data);
        this.sales = data;
        if (this.sales.length === 0) {
          this.warning.messageEmptySearch = true;
        }
        this.saleSelected = this.sales[0];
        this.loadingIndicator = true;
        this.error.loadingSale = false;
      }, (err) => {
        console.log(err);
        this.loadingIndicator = true;
        this.error.loadingSale = true;
      }
    );
  } else {
    if (this.data.trier_par === null) {
      const send = {
        caissier: this.data.caissier,
        trier_par: this.data.trier_par
      };
      this.salesService.GetVentes(send).subscribe(
        (data) => {
          console.log(data);
          this.sales = data;
          if (this.sales.length === 0) {
            this.warning.messageEmptySearch = true;
          }
          this.saleSelected = this.sales[0];
          this.loadingIndicator = true;
          this.error.loadingSale = false;

        }, (err) => {
          console.log(err);
          this.loadingIndicator = true;
          this.error.loadingSale = true;
        }
      );
    } else if (this.data.trier_par === 'annee' && this.data.annee.state === true) {
      const send = {
        caissier: this.data.caissier,
        trier_par: this.data.trier_par,
        annee: this.year
      };
      console.log(send);
      
      this.salesService.GetVentes(send).subscribe(
        (data) => {
          console.log(data);
          this.sales = data;
          if (this.sales.length === 0) {
            this.warning.messageEmptySearch = true;
          }
          this.saleSelected = this.sales[0];
          this.loadingIndicator = true;
          this.error.loadingSale = false;

        }, (err) => {
          console.log(err);
          this.loadingIndicator = true;
          this.error.loadingSale = true;
        }
      );
    } else if (this.data.trier_par === 'mois' && this.data.mois.state === true) {
      const send = {
        caissier: this.data.caissier,
        trier_par: this.data.trier_par,
        mois: this.month
      };
      this.salesService.GetVentes(send).subscribe(
        (data) => {
          console.log(data);
          this.sales = data;
          if (this.sales.length === 0) {
            this.warning.messageEmptySearch = true;
          }
          this.saleSelected = this.sales[0];
          this.loadingIndicator = true;
          this.error.loadingSale = false;

        }, (err) => {
          console.log(err);
          this.loadingIndicator = true;
          this.error.loadingSale = true;
        }
      );
    } else if (this.data.trier_par === 'intervalle' && this.data.date_debut.state === true && this.data.date_fin.state === true) {
      const send = {
        caissier: this.data.caissier,
        trier_par: this.data.trier_par,
        date_debut: this.start_date,
        date_fin: this.end_date
      };
      this.salesService.GetVentes(send).subscribe(
        (data) => {
          console.log(data);
          this.sales = data;
          if (this.sales.length === 0) {
            this.warning.messageEmptySearch = true;
          }
          this.saleSelected = this.sales[0];
          this.loadingIndicator = true;
          this.error.loadingSale = false;

        }, (err) => {
          console.log(err);
          this.loadingIndicator = true;
          this.error.loadingSale = true;
        }
      );
    }
  } 
    
 }

  GetSales() {
    const caissierInfo = JSON.parse(localStorage.getItem('caissier'));
    this.salesService.GetSalesByCaisser().subscribe(
      (data) => {
        console.log(data);
        this.loadingIndicator = true;
        this.error.loadingSale = false;
        this.sales = data.reverse();

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
   this.loadingIndicator = false;
   this.warning.messageEmptySearch = false;
   const id = this.caissier;
   this.salesService.GetSalesByMonth(id, this.month).subscribe(
     (data) => {
       console.log(data);
       this.loadingIndicator = true;
       this.error.loadingSale = false;
       this.sales = data;
       if (this.sales.length === 0) {
         this.warning.messageEmptySearch = true;
       }
     }, (err) => {
       console.log(err);
       this.loadingIndicator = true;
       this.error.loadingSale = true;
     }
   );
 }

 SearchWithYear() {
   console.log(this.year);
   this.loadingIndicator = false;
   this.warning.messageEmptySearch = false;
   const id = Number(this.caissier);
   this.salesService.GetSalesByYear(id, this.year).subscribe(
     (data) => {
       console.log(data);
       this.loadingIndicator = true;
       this.error.loadingSale = false;
       this.sales = data;
       if (this.sales.length === 0) {
         this.warning.messageEmptySearch = true;
       }
     }, (err) => {
       console.log(err);
       this.loadingIndicator = true;
       this.error.loadingSale = true;
     }
   );
 }

 SearchBetweenDate() {
   console.log(this.start_date);
   console.log(this.end_date);
   this.loadingIndicator = false;
   this.warning.messageEmptySearch = false;
   let data = {
     caissier: Number(this.caissier),
     start_date: this.start_date,
     end_date: this.end_date
   };
   console.log(data);
   this.salesService.GetSalesBetweenYear(data).subscribe(
     // tslint:disable-next-line:no-shadowed-variable
     (data) => {
       console.log(data);
       this.loadingIndicator = true;
       this.error.loadingSale = false;
       this.sales = data;
       if (this.sales.length === 0) {
         this.warning.messageEmptySearch = true;
       }
     }, (err) => {
       console.log(err);
       this.loadingIndicator = true;
       this.error.loadingSale = true;
     }
   );
 }


 ReloadOrder() {
   this.loadingIndicator = false;
   this.warning.messageEmptySearch = false;
   this.option = 'Choisir ...';
   this.sales = [];
   if (this.user.role !== 'admin') {
    this.GetSales();
   } else {
     this.data.caissier = 'all';
     this.data.trier_par = null;
     this.data.mois.state = false;
     this.data.annee.state = false;
     this.data.date_debut.state = false;
     this.data.date_fin.state = false;
     this.GetRealSales();
   }
 }


 GeneratePDF() {
   let data = {
     idOrder : this.saleSelected.order.order_number,
     produit : this.saleSelected.order.cart_info,
     caissier : JSON.parse(localStorage.getItem('caissier')).name,
     client : this.saleSelected.client,
     subTotal: this.saleSelected.order.sub_total,
     total : this.saleSelected.order.total_amount,
     reduction : this.saleSelected.order.coupon,
     date : this.saleSelected.order.created_at,
     montant_recu: this.saleSelected.order.montant_recu,
     exchange: (Number(this.saleSelected.order.montant_recu) - Number(this.saleSelected.order.total_amount)),
     payment : {
       type : this.saleSelected.order.payment_method
     }
   };
   this.salesService.GeneratePDFForSales(data);
 }
}
