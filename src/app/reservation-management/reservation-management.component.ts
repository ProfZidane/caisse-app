import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ReservationService } from '../services/reservation.service';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.css']
})
export class ReservationManagementComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  visibility = true;
  error = {
    data: false,
    delete: false,
    text: ''
  };
  reservations;
  success;
  successText;
  constructor(private reservationService: ReservationService, private router: Router) { }

  ngOnInit(): void {
    this.getReservations();
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

  getReservations() {
    this.error.data = false;
    this.reservationService.getReservation().subscribe(
      (data) => {
        console.log(data);
        this.visibility = false;
        this.reservations = data.data;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.visibility = false;
        this.error.data = true;
      }
    );
  }

  goToDetailOrder(id) {
    console.log(id);
    this.router.navigateByUrl('/reservation/(child4:reservation-detail/' + id + ';open=true)');
  }

  removeReservation(numReservation) {
    console.log(numReservation);
    this.error.delete = false;
    this.success = false;
    this.reservationService.removeReservation(numReservation).subscribe(
      (success) => {
        console.log(success);
        this.success = true;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.success = true;
        this.error.delete = true;
        this.error.text = 'Une erreur est survenue. Veuilez réessayez plus tard.';
      }
    );
  }

}
