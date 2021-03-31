import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goToCustomer() {
    this.route.navigateByUrl('/home/(child1:customer;open=true');
  }

  goToHome() {
    this.route.navigateByUrl('/home');
  }

}
