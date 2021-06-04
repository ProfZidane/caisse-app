import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ReservationService } from '../services/reservation.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
id;
visibility = true;
error = {
  data: false,
  product: false,
  change: false,
  delete: false,
  text: ''
};
details;
products;
dtTrigger: Subject<any> = new Subject<any>();
dtOptions: any = {};
image;
name;
success;
changeSuccess;
  constructor(private route: ActivatedRoute, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params => {
        this.id = params.get('id');
      })
    );
    console.log(this.id);
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
    this.getDetailReservation(this.id);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }


  getDetailReservation(id) {
    this.error.data = false;
    this.reservationService.getDetailReservation(id).subscribe(
      (data) => {
        console.log(data);
        this.products = data.data[0].products;
        this.details = data.data[0].reservation;
        console.log(this.details);
        this.dtTrigger.next();
        this.visibility = false;
      }, (err) => {
        console.log(err);
        this.visibility = false;

        this.error.data = true;
      }
    );
  }

  viewImageProduct(name, url) {
    this.name = name;
    this.image = url;
  }


  deleteProduct(idProduct) {
    console.log(idProduct);
    console.log(this.id);

    this.success = false;
    this.reservationService.deleteProductReservation(this.id, idProduct).subscribe(
      (success) => {
        console.log(success);
        this.success = true;
        this.error.product = true;
        // this.getDetailReservation(this.id);

        setTimeout( () => {
          this.error.product = false;
          window.location.reload();
        }, 1000);
      }, (err) => {
        console.log(err);
        this.success = true;
      }
    );
  }

  removeReservation(numReservation) {
    console.log(numReservation);
    if (confirm('Êtes-vous sur de le vouloir ? ')) {
      this.error.delete = false;
      this.success = false;
      this.reservationService.removeReservation(numReservation).subscribe(
        (success) => {
          console.log(success);
          this.success = true;
          window.history.back();
        }, (err) => {
          console.log(err);
          this.success = true;
          this.error.delete = true;
          this.error.text = 'Une erreur est survenue. Veuilez réessayez plus tard.';
        }
      );
    }
  }


  changeToOrder(num) {
    this.success = false;
    this.error.change = false;
    this.changeSuccess = false;
    this.reservationService.changeToOrders(num).subscribe(
      (success) => {
        console.log(success);
        this.success = true;
        this.changeSuccess = true;

        setTimeout( () => {
          this.changeSuccess = false;
          window.history.back();
        }, 2000
        );
      }, (err) => {
        console.log(err);
        this.success = true;
        this.error.change = true;
      }
    );
  }



}
