import { Component, OnInit } from '@angular/core';
import { RecapService } from '../services/recap.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recap-periode-management',
  templateUrl: './recap-periode-management.component.html',
  styleUrls: ['./recap-periode-management.component.css']
})
export class RecapPeriodeManagementComponent implements OnInit {
  visibility;
  report;
  now;
  sales;
  reservations;
  caissier;
  date = {
    date_debut: '',
    date_fin: ''
  };
  constructor(private recapService: RecapService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.now = new Date().toLocaleDateString();
    this.route.paramMap.subscribe(
      (params => {
        this.date.date_debut = params.get('dd');
        this.date.date_fin = params.get('df');
      })
    );
    this.getReport();
  }


  getReport() {
    this.visibility = true;
    this.recapService.getRapportBetweenDate(this.date).subscribe(
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
