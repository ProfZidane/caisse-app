import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
userConnected;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('caissier') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('caissier'));
    }
  }

  logout() {
    // remove data in localstorage
    localStorage.removeItem('word_token');
    this.router.navigateByUrl('/');
  }

}
