import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../services/statistic.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-etat-management',
  templateUrl: './etat-management.component.html',
  styleUrls: ['./etat-management.component.css']
})
export class EtatManagementComponent implements OnInit {


constructor(private statService: StatisticService, private route: ActivatedRoute,) { }
state;
dateDebut;
dateFin;
dtTrigger: Subject<any> = new Subject<any>();
dtOptions: any = {};
reservations;
detailSalesByFactures;
cumulSalesByFactures;
cumulSalesByCustomer;
reglementClient;
etatCompteClient;
cumulSalesByArticles;
visibility;
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params => {
        this.state = params.get('s');
        this.dateDebut = params.get('dd');
        this.dateFin = params.get('df');
      })
    );
    console.log(this.state);
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
      },
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel'
      ]
    };
    if (this.state === 'etat_reservation') {

      this.getReservation();

    } else if (this.state === 'detail_vente_par_facture_sur_periode') {

      this.getVentesParFactureSurPeriode(this.dateDebut, this.dateFin);

    } else if (this.state === 'cumul_ventes_par_facture_sur_periode') {

      this.getCumulVentesParFacture(this.dateDebut, this.dateFin);

    } else if (this.state === 'cumul_ventes_par_client_sur_periode') {

      this.getCumulVentesParClient(this.dateDebut, this.dateFin);

    } else if (this.state === 'etat_reglement_client_sur_periode') {

      this.getReglementClientParPeriode(this.dateDebut, this.dateFin);

    } else if (this.state === 'etat_compte_client_a_date') {

      this.getEtatCompteClient(this.dateFin);

    } else if (this.state === 'cumul_ventes_par_article_sur_periode') {

      this.getCumulVenteParArticle(this.dateDebut, this.dateFin);

    } else {
      console.log('not found');
    }


  }

  // Pour les réservations
  getReservation() {
    this.visibility = true;
    this.statService.getReservations().subscribe(
      (data) => {
        console.log(data);
        this.reservations = data.data;
        this.visibility = false;
      }, (err) => {
        console.log(err);
        this.visibility = false;
      }
    );
  }

  goToDetailOrder(id) {

  }


  // Pour les ventes
  getVentesParFactureSurPeriode(dd, df) {
    this.visibility = true;
    const data = {
      dd,
      df
    };
    this.statService.getDetailSalesByFacturesOnTime(data).subscribe(
      (datas) =>  {
        console.log(datas);
        this.detailSalesByFactures = datas.data;
        this.visibility = false;
      }, (err) => {
        console.log(err);
        this.visibility = false;
      }
    );
  }

  getCumulVentesParFacture(dd, df) {
    this.visibility = true;
    const data = {
      dd,
      df
    };
    this.statService.getCumulSalesByFactureOnTime(data).subscribe(
      (datas) => {
        console.log(datas);
        this.cumulSalesByFactures = datas.data;
        this.visibility = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.visibility = false;
      }
    );
  }

  getCumulVentesParClient(dd, df) {
    this.visibility = true;
    const data = {
      dd,
      df
    };
    this.statService.getCumulSalesByCustomerOnTime(data).subscribe(
      (datas) => {
        console.log(datas);
        this.cumulSalesByCustomer = datas.data;
        this.dtTrigger.next();
        this.visibility = false;
      }, (err) => {
        console.log(err);
        this.visibility = false;
      }
    );
  }


  // Pour les règlements
  getReglementClientParPeriode(dd, df) {
    this.visibility = true;
    const data = {
      dd,
      df
    };
    this.statService.getEtatReglementOnTime(data).subscribe(
      (datas) => {
        console.log(datas);
        this.reglementClient = datas.data;
        this.dtTrigger.next();
        this.visibility = false;
      }, (err) => {
        console.log(err);
        this.visibility = false;
      }
    );
  }

  getEtatCompteClient(df) {
    this.visibility = true;
    const data = {
      df
    };
    this.statService.getEtatAccountByEndTime(data).subscribe(
      (datas) => {
        console.log(datas);
        this.etatCompteClient = datas.data;
        this.dtTrigger.next();
        this.visibility = false;
      }, (err) => {
        console.log(err);
        this.visibility = false;
      }
    );
  }

  getCumulVenteParArticle(dd, df) {
    this.visibility = true;
    const data = {
      dd,
      df
    };
    this.statService.getSalesByArticlesOnTIme(data).subscribe(
      (datas) => {
        console.log(datas);
        this.cumulSalesByArticles = datas.data;
        this.visibility = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.visibility = false;
      }
    );
  }


  //

}
