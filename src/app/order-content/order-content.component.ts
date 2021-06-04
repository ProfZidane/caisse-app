import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-order-content',
  templateUrl: './order-content.component.html',
  styleUrls: ['./order-content.component.css']
})
export class OrderContentComponent implements OnInit {
  orders;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  visibility = true;
  loading;
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
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
  }

  getOrders() {
    this.orderService.getAllOrder().subscribe(
      (data) => {
        console.log(data);
        this.orders = data;


        this.dtTrigger.next();
        this.visibility = false;
      }, (err) => {
        console.log(err);
        this.visibility = false;
      }
    );
  }

  goToDetailOrder(id) {
    console.log(id);
    this.router.navigateByUrl('/order/(child3:order-detail/' + id + ';open=true)');
  }

}
