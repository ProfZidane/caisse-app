import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.component.html',
  styleUrls: ['./sales-detail.component.css']
})
export class SalesDetailComponent implements OnInit {
elementClicked;
visibility = {
  daily : false,
  general : true,
  detail : false
};
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
    this.visibility.daily = true;
    this.visibility.detail = false;
    this.visibility.general = false;
    // this.router.navigateByUrl('/sales(child2:sales-group;child21:sales-daily;open=true)');
  }

  GoToGeneralBook(classes) {
    this.ChangeRoute(classes);
    this.visibility.daily = false;
    this.visibility.detail = false;
    this.visibility.general = true;
  }

  GoToSpecificBook(classes) {
    this.ChangeRoute(classes);
    this.visibility.daily = false;
    this.visibility.detail = true;
    this.visibility.general = false;
  }

}
