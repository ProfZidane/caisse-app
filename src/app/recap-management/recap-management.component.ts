import { Component, OnInit } from '@angular/core';
import { RecapService } from '../services/recap.service';

@Component({
  selector: 'app-recap-management',
  templateUrl: './recap-management.component.html',
  styleUrls: ['./recap-management.component.css']
})
export class RecapManagementComponent implements OnInit {
visibility;
report;
now;
sales;
reservations;
caissier;
  constructor(private recapService: RecapService) { }

  ngOnInit(): void {
    this.now = new Date().toLocaleDateString();
    this.getReport();
  }


  getReport() {
    this.visibility = true;
    this.recapService.getRapport().subscribe(
      (data) => {
        console.log(data);
        this.caissier = data[0].dataCaissier;
        this.sales = data[0].ventes;
        this.reservations = data[0].reservations;
        this.visibility = false;
      }, (err) => {
        console.log(err);
        this.visibility = false;
      }
    );
  }

}
