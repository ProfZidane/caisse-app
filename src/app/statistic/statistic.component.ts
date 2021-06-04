import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  type = 'pie';
  data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "My First dataset",
        data: [65, 59, 80, 81, 56, 55],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ], borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };
  state;
  date = {
    debut: '',
    fin: ''
  };
  constructor(private router: Router) { }

  ngOnInit(): void {
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
}
