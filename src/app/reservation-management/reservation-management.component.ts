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
      ordering: false
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
