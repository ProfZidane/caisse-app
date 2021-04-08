import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
// http://accessoire-mode.lce-test.fr/
getproductURL = 'https://accessoire-mode.lce-test.fr/api/caisse/getAllProducts';
getProductByIdURL = 'https://accessoire-mode.lce-test.fr/api/caisse/getProduct/';
Articles;
Products = [];
productCart;
emptyCart = [];
  constructor(private http: HttpClient, private s: MatSnackBar) { }


  GetProducts(): Observable<any> {
    return this.http.get(this.getproductURL);
  }

  GetProductBySlug(slug): Observable<any> {
    return this.http.get(this.getProductByIdURL + slug);
  }

  GetProductInCart(numCart: string): Array<any> {
    if (Number(numCart) <= 3 && Number(numCart) > 0) {
      this.productCart = JSON.parse(localStorage.getItem('cart-' + numCart));
    }
    return this.productCart;
  }

  GetEmptyCart(): Array<any> {
    const tabKeyCart = ['1', '2', '3'];
    const cartEmpty = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < tabKeyCart.length; i++) {
      const stateCart = JSON.parse(localStorage.getItem('cart'));
      console.log(stateCart[0][tabKeyCart[i.toString()]]);

      if (stateCart[0][tabKeyCart[i.toString()]] === true) {
        console.log(tabKeyCart[i]);

        const cart = JSON.parse(localStorage.getItem('cart-' + tabKeyCart[i]));
        if (cart.length === 0) {
          this.emptyCart.push(tabKeyCart[i]);
        }
      } else {
        console.log('panier no activé !');
      }

    }

    console.log(this.emptyCart);

    return this.emptyCart;
  }


  SetQuantityProductToCart(numCart: string, object): void {
    console.log('fonction daugmentation de la quantite !');

    if (Number(numCart) <= 3 && Number(numCart) > 0) {
      this.productCart = JSON.parse(localStorage.getItem('cart-' + numCart));
      this.productCart.forEach(element => {
        if (element.identify === object.identify && element.quantity < element.stock) {
          element.quantity ++;
          console.log(element);
          localStorage.setItem('cart-' + numCart, JSON.stringify(this.productCart));
          this.s.open('Quantité augmentée !', 'OK');
        } else {
          console.log('stock atteind');
          this.s.open('Cet produit ne peut être choisie. Son stock est limité !', 'OK');
        }
      });
    }
  }

  SetProductToCart(numCart: string, object): void {
    this.productCart = JSON.parse(localStorage.getItem('cart-' + numCart));
    this.productCart.push(object);
    localStorage.setItem('cart-' + numCart, JSON.stringify(this.productCart));
  }

  VerifyIfStockRest(object) {
    const tabKeyCart = ['1', '2', '3'];
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < tabKeyCart.length; j++) {

    }
  }
}
