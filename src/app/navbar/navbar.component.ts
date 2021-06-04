import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
userConnected;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('caissier') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('caissier'));
    }
  }

  logout() {
    // remove data in localstorage
    this.authService.Logout().subscribe(
      (success) => {
        console.log(success);
        localStorage.removeItem('word_token');
        this.router.navigateByUrl('/');
      }, (err) => {
        console.log(err);
        alert(JSON.stringify(err));
      }
    );
  }

}
