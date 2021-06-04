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
        sortAscending:  ': activer pour trier la colonne par ordre croissant',
        sortDescending: ': activer pour trier la colonne par ordre décroissant'
    }
      }
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
