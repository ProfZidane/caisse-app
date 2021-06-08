import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticService } from '../services/statistic.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  type = 'line';
  data;
  options = {
    responsive: true,
    maintainAspectRatio: false
  };
  state;
  date = {
    debut: '',
    fin: ''
  };
  labels;
  points = [];
  constructor(private router: Router, private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.getSalesData();
  }

  checkEtat(event) {
    console.log(event.target.value);
    this.state = event.target.value;
    if (this.state === 'etat_reservation') {
      console.log('go to etat management with reservation state !');
      this.router.navigateByUrl('/etat-manage/' + this.state + '/null/null');
    } else if (this.state === 'detail_vente_par_facture_sur_periode' || this.state === 'cumul_ventes_par_facture_sur_periode'
                || this.state === 'cumul_ventes_par_client_sur_periode' || this.state === 'etat_reglement_client_sur_periode'
                || this.state === 'etat_compte_client_a_date' || this.state === 'cumul_ventes_par_article_sur_periode') {
      console.log('open modal to get date');
    }

  }

  validationDate(id) {
    console.log(this.date);
    document.getElementById(id).style.display = "none";
    this.router.navigateByUrl('/etat-manage/' + this.state + '/' + this.date.debut + '/' + this.date.fin);
  }


  getSalesData() {
    this.statisticService.getSalesOfYear().subscribe(
      (data) => {
        console.log(data);
        this.labels = Object.keys(data);
        console.log(this.labels);
        const p = Object.values(data);
        p.forEach(element => {
          this.points.push(Number(element));
        });
        console.log(this.points);

        this.data = {
          labels: this.labels,
          datasets: [
            {
              label: "Ventes Annuelles",
              data: this.points,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(116, 208, 241, 0.2)',
                    'rgba(86, 115, 154, 0.2)',
                    'rgba(103, 113, 121, 0.2)',
                    'rgba(182, 120, 35, 0.2)',
                    'rgba(9, 82, 40, 0.2)',
                    'rgba(201, 160, 220, 0.2)'
                ], borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(116, 208, 241, 1)',
                    'rgba(86, 115, 154, 1)',
                    'rgba(103, 113, 121, 1)',
                    'rgba(182, 120, 35, 1)',
                    'rgba(9, 82, 40, 1)',
                    'rgba(201, 160, 220, 1)'
              ],
              borderWidth: 1
            }
          ]
        };

      }, (err) => {
        console.log(err);
      }
    );
  }
}
