import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesOperateService } from '../services/sales-operate.service';
import { Subject } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Pdf2Service } from '../services/pdf-2.service';

@Component({
  selector: 'app-facture-detail',
  templateUrl: './facture-detail.component.html',
  styleUrls: ['./facture-detail.component.css']
})
export class FactureDetailComponent implements OnInit {
  id;
  loading = {
    data: true,
    create: false
  };
  error = {
    data: false,
    text: 'Une erreur est survenue. Veuillez réessayer plus tard svp !'
  };
  sale;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  details = [];
  products = [];
  newMontant;
  objectProductPdf = [];
  objectPaidPdf = [];
  constructor(private salesService: SalesOperateService, private route: ActivatedRoute,
              private pdf2Service: Pdf2Service) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params => {
        this.id = params.get('id');
      })
    );
    console.log(this.id);
    this.getDetailSales();
  }


  getDetailSales() {
    this.salesService.GetDetailSalesEchelonne(this.id).subscribe(
      (data) => {
        let i = 0;
        console.log(data);
        this.sale = data;
        this.products = data[0].cart_info;
        data[0].payements.forEach(element => {
          element.num = i;
          this.details.push(element);
          i++;
        });
        console.log(this.details);
        console.log(this.products);
        this.loading.data = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.loading.data = false;
      }
    );
  }

  createNewVersement() {
    console.log(this.newMontant);
    this.loading.create = true;
    const data = {
      order_id: this.sale[0].order.id,
      caissier: JSON.parse(localStorage.getItem('caissier')).id,
      montant: Number(this.newMontant)
    };
    console.log(data);

    this.salesService.SetNewPriceEchelonne(data).subscribe(
      (success) => {
        console.log(success);
        this.loading.create = false;
        const versement = [
          {
            border : [false, false, false, false],
            text : (this.details[this.details.length - 1].num + 2).toString() + 'er versement',
            alignment : 'center',
            fontSize: 7.5
          },
          {
            border : [false, false, false, false],
            text : '',
            alignment : 'center',
          },
          {
            border : [false, false, false, false],
            text : 'FCFA',
            alignment : 'center',
            fontSize: 7.5
          },
          {
            border : [false, false, false, false],
            text : this.newMontant,
            alignment : 'center',
            fontSize: 7.5
          }
        ];

        console.log(versement);

        this.printFacture(versement);

        setTimeout( () => {
          window.location.reload();
        }, 1000);
      }, (err) => {
        console.log(err);
        this.loading.create = false;
      }
    );

  }

  retiredProduct(id) {
    console.log(id);

  }

  printFacture(newObject) {
    this.objectPaidPdf = [];
    this.objectProductPdf = [];
    this.sale[0].cart_info.forEach(element => {
      const newObject = [
        {
          border : [false, false, false, false],
          text : element.quantity.toString(),
          fontSize : 8,
          alignment : 'center',
        },
        {
          border : [false, false, false, false],
          text : element.title,
          fontSize : 8,
          alignment : 'center',
        },
        {
          border : [false, false, false, false],
          text : element.price.toString(),
          fontSize : 8,
          alignment : 'center',
        },
        {
          border : [false, false, false, false],
          text : element.amount.toString(),
          fontSize : 8,
          alignment : 'center',
        }
      ];
      this.objectProductPdf.push(newObject);
    });

    this.sale[0].payements.forEach(element => {
      const pe = [
        {
          border : [false, false, false, false],
          text : (element.num + 1).toString() + 'er versement',
          alignment : 'center',
          fontSize: 7.5
        },
        {
          border : [false, false, false, false],
          text : '',
          alignment : 'center',
        },
        {
          border : [false, false, false, false],
          text : 'FCFA',
          alignment : 'center',
          fontSize: 7.5
        },
        {
          border : [false, false, false, false],
          text : element.montant,
          alignment : 'center',
          fontSize: 7.5
        }
      ];
      this.objectPaidPdf.push(pe);
    });

    if (newObject !== null) {
      this.objectPaidPdf.push(newObject);
      this.sale[0].order.reste -= Number(this.newMontant);
    }

    const data = {
      idOrder: this.sale[0].order.order_number,
      produit: this.objectProductPdf,
      caissier: JSON.parse(localStorage.getItem('caissier')).name,
      customer : { name: this.sale[0].order.first_name, telephone: this.sale[0].phone },
      subTotal: this.sale[0].order.sub_total,
      total: this.sale[0].order.total_amount,
      remise: 'Pas marquée',
      // tslint:disable-next-line:max-line-length
      date: new Date(this.sale[0].order.created_at).toLocaleDateString('fr-fr', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            + ' ' + new Date(this.sale[0].order.created_at).toLocaleTimeString(),
      montant_recu: this.objectPaidPdf,
      exchange: this.sale[0].order.reste
    };

    console.log(data);

    this.pdf2Service.generatePdf(data);
  }

}
