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
user;
  constructor(private salesService: SalesOperateService) { }

  ngOnInit(): void {
    if (localStorage.getItem('caissier') !== null) {
      this.user = JSON.parse(localStorage.getItem('caissier'));
    }
    console.log(this.user.role);
    this.id = JSON.parse(localStorage.getItem('caissier')).id;
    this.dtOptions = {
      ordering: false,
      language: {
        search: 'Rechercher &nbsp;:',
        lengthMenu:    'Afficher _MENU_ &eacute;l&eacute;ments',
        info:           'Affichage de l\'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments',
        infoEmpty:      'Affichage de l\'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments',
        infoFiltered:   '(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)',
        infoPostFix:    '',
        loadingRecords: 'Chargement en cours...',
        zeroRecords:    'Aucun &eacute;l&eacute;ment &agrave; afficher',
        paginate: {
          first:      'Premier',
          previous:   'Pr&eacute;c&eacute;dent',
          next:       'Suivant',
          last:       'Dernier'
      },
      emptyTable:     'Aucune donnée disponible dans le tableau',
      aria: {
        sortAscending:  ": activer pour trier la colonne par ordre croissant",
        sortDescending: ": activer pour trier la colonne par ordre décroissant"
    }
      }
    };
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
