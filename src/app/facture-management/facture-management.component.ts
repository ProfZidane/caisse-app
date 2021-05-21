import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SalesOperateService } from '../services/sales-operate.service';
import { Router } from '@angular/router';
import { Pdf2Service } from '../services/pdf-2.service';


@Component({
  selector: 'app-facture-management',
  templateUrl: './facture-management.component.html',
  styleUrls: ['./facture-management.component.css']
})
export class FactureManagementComponent implements OnInit {
  visibility = true;
  visibility2 = true;
  error = {
    modify: false,
    text: ''
  };
  loading = {
    data: true,
    create: false
  };
  success = {
    modify: false,
  };
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  dtTrigger2: Subject<any> = new Subject<any>();
  dtOptions2: any = {};
  sales;
  salesPaid;
  new = {
    id: '',
    value: 0
  };
  historyVersement = [];
  newMontant;
  objectProductPdf = [];
  objectPaidPdf = [];
  details = [];
  products = [];
  constructor(private salesService: SalesOperateService, private router: Router, private pdf2Service: Pdf2Service) { }

  ngOnInit(): void {
    this.dtOptions = {
      ordering: false
    };
    this.dtOptions2 = {
      ordering: false
    };
    this.getEchellone();
    this.getEchellonePaid();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  getEchellone() {
    this.salesService.GetSalesEchelonne().subscribe(
      (data) => {
        console.log(data);
        this.visibility = false;
        this.sales = data;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.visibility = false;
      }
    );
  }

  getEchellonePaid() {
  this.salesService.GetSalesPaidEchelonne().subscribe(
    (data) => {
      let i = 0;
      console.log(data);
      this.visibility2 = false;
      this.salesPaid = data;

      this.dtTrigger2.next();
    }, (err) => {
      console.log(err);
      this.visibility2 = false;
    }
  );
}

  setNewPrice(id) {
    this.new.id = id;
    console.log(this.new);

  }

  goToDetail(idOrder) {
    /*this.historyVersement = [];
    let i = 0;
    data.forEach(element => {
      element.num = i;
      this.historyVersement.push(element);
      i++;
    });
    console.log(this.historyVersement);*/
    console.log(idOrder);
    this.router.navigateByUrl('/facture-detail/' + idOrder);
  }

 /* createNewVersement() {
    console.log(this.newMontant);
    console.log(this.newMontant);
    this.loading.create = true;
    const data = {
      order_id: this.salesPaid[0].order.id,
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

  printFacture(newObject) {
    this.objectPaidPdf = [];
    this.objectProductPdf = [];
    this.salesPaid[0].cart_info.forEach(element => {
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

    this.salesPaid[0].payements.forEach(element => {
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
      this.salesPaid[0].order.reste -= Number(this.newMontant);
    }

    const data = {
      idOrder: this.salesPaid[0].order.order_number,
      produit: this.objectProductPdf,
      caissier: JSON.parse(localStorage.getItem('caissier')).name,
      customer : { name: this.salesPaid[0].order.first_name, telephone: this.salesPaid[0].phone },
      subTotal: this.salesPaid[0].order.sub_total,
      total: this.salesPaid[0].order.total_amount,
      remise: 'Pas marquée',
      // tslint:disable-next-line:max-line-length
      date: new Date(this.salesPaid[0].order.created_at).toLocaleDateString('fr-fr', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            + ' ' + new Date(this.salesPaid[0].order.created_at).toLocaleTimeString(),
      montant_recu: this.objectPaidPdf,
      exchange: this.salesPaid[0].order.reste
    };

    console.log(data);

    this.pdf2Service.generatePdf(data);
  }*/
}
