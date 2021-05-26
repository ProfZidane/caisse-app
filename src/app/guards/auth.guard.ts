import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CryptoService } from '../services/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cryptoService: CryptoService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('word_token');
      if (token !== null) {
        const token = JSON.parse(localStorage.getItem('word_token'));
        const data = JSON.parse(localStorage.getItem('caissier'));
        const decryptData = this.cryptoService.DecryptData(token.key);


        if (decryptData === data.id + ' ' + data.name) {
          return true;
        } else {
          console.log('401');
          this.router.navigateByUrl('/');
          return false;
        }
      } else {
        console.log('401');
        this.router.navigateByUrl('/');
        return false;
      }
  }

}
