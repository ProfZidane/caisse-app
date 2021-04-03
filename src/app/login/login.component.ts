import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
  password : '',
  device : 'caisse'
};

errors = {
  error_email : '',
  error_password : '',
  error_global : ''
};
  constructor(private route: Router, private authService: AuthService) { }


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

  VerificationAuth(data) {
    this.errors.error_email = '';
    this.errors.error_password = '';
    this.errors.error_global = '';
    this.success = false;
    this.authService.AuthentificationByEmail(data).subscribe(
      (success) => {
        console.log(success);
        if (success.status_code === 401 && success.state === false) {
          this.errors.error_global = 'Votre adresse e-mail ou votre mot de passe est incorrecte !';

          setTimeout( () => {
              this.success = true;
              this.data.email = '';
              this.data.password = '';
            }, 1000);
        } else if (success.status_code === 200) {
          // save in localstorage
          localStorage.setItem('caissier', JSON.stringify(success.data));
          setTimeout( () => {
            this.success = true;
            // location.href = '/home';
            this.route.navigateByUrl('/home');
          }, 3000);
        }
      }, (err) => {
        console.log(err);
        this.errors.error_global = 'Votre adresse e-mail ou votre mot de passe est incorrecte !';

        setTimeout( () => {
            this.success = true;
            this.data.email = '';
            this.data.password = '';
          }, 1000);
        }
    );
  }

  login() {
    console.log(this.data);
    this.VerificationAuth(this.data);
  }
  /*onSumitted(f: NgForm) {
    if (f) {
      console.log('jai click');
    }

  }*/
}
