import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
userConnected;
  constructor(private router: Router, private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    if (localStorage.getItem('caissier') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('caissier'));
    }

    console.log(JSON.parse(localStorage.getItem('word_token')).token);


  }

  logout() {
    localStorage.removeItem('word_token');
    localStorage.removeItem('userData');
    this.router.navigateByUrl('/');
    /*
    // remove data in localstorage
    this.authService.Logout().subscribe(
      (success) => {
        console.log(success);
        localStorage.removeItem('word_token');
        this.router.navigateByUrl('/');
      }, (err) => {
        console.log(err);
        // alert(JSON.stringify(err));
      }
    );*/
  }

  requestTest() {
    this.http.post('https://accessoiresmodes.com/api/logout', {
      headers: new HttpHeaders({
        'Content-type' : 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('word_token')).token
      })
    }).subscribe( (success) => {
      console.log(success);

    }, (err) => {
      console.log(err);

    });
  }

}
