import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loadingFinish = true;
success;
data = {
  email : '',
  password : ''
};

errors = {
  error_email : '',
  error_password : ''
};
  constructor(private route: Router) { }


  ngOnInit(): void {
  }

  VerifyAuth(data) {

    if (data.email === 'madazada0@gmail.com') {

      if (data.password === 'azerty') {

        return true;

      } else {

        return 1;
      }

    } else {

      return 0;

    }
  }

  login() {
    this.errors.error_email = '';
    this.errors.error_password = '';
    this.success = false;
    console.log(this.data);

    if (this.VerifyAuth(this.data) === true) {

      setTimeout( () => {
        this.success = true;
        // location.href = '/home';
        this.route.navigateByUrl('/home');
      }, 3000);

    } else if (this.VerifyAuth(this.data) === 0) {

      this.errors.error_email = 'Votre adresse e-mail n\'existe pas dans notre base de donnée !';

      setTimeout( () => {
        this.success = true;
        this.data.email = '';
        this.data.password = '';
      }, 1000);

    } else if (this.VerifyAuth(this.data) === 1) {

      this.errors.error_password = 'Votre mot de passe est pas correcte !';

      setTimeout( () => {
        this.success = true;
        this.data.email = '';
        this.data.password = '';
      }, 1000);
    }

  }
  /*onSumitted(f: NgForm) {
    if (f) {
      console.log('jai click');
    }

  }*/
}
