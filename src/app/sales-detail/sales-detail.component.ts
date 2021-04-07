import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.component.html',
  styleUrls: ['./sales-detail.component.css']
})
export class SalesDetailComponent implements OnInit {
elementClicked;
  constructor(private router: Router) {

   }

  ngOnInit(): void {
    // this.ChangeRoute();
  }

  ChangeRoute(classes) {
    document.querySelectorAll('.nav-link').forEach( element => {
      if (element.getAttribute('id') === 'active') {
        element.removeAttribute('id');
      }
    });
    document.querySelector('.' + classes).setAttribute('id', 'active');
  }

  GoToDailyBook(classes) {
    this.ChangeRoute(classes);
    this.router.navigateByUrl('/sales/sales-group/(child21:/sales-daily;open=true)');
  }

  GoToGeneralBook(classes) {
    this.ChangeRoute(classes);
  }

  GoToSpecificBook(classes) {
    this.ChangeRoute(classes);
  }

}
