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


  // Getter de produit general
  GetProducts(): Observable<any> {
    return this.http.get(this.getproductURL);
  }


  // Recherche de produit par slug
  GetProductBySlug(slug): Observable<any> {
    return this.http.get(this.getProductByIdURL + slug);
  }


  // Récupérer les differents produits d'un panier
  GetProductInCart(numCart: string): Array<any> {
    if (Number(numCart) <= 3 && Number(numCart) > 0) {
      this.productCart = JSON.parse(localStorage.getItem('cart-' + numCart));
    }
    return this.productCart;
  }


  // Récupérer les paniers qui sont vides
  GetEmptyCart(): Array<any> {
    const tabKeyCart = ['1', '2', '3'];
    this.emptyCart = [];
    const cartEmpty = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < tabKeyCart.length; i++) {
      const stateCart = JSON.parse(localStorage.getItem('cart'));
      console.log(stateCart[0][tabKeyCart[i.toString()]]);

      if (stateCart[0][tabKeyCart[i.toString()]] === true) {
        console.log(tabKeyCart[i]);

        const cart = JSON.parse(localStorage.getItem('cart-' + tabKeyCart[i]));
        if (cart.length === 0) {
          console.log(cart);
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

  // ajouter au panier (dans le localStorage)
  SetProductToCart(numCart: string, object) {
    this.productCart = JSON.parse(localStorage.getItem('cart-' + numCart));
    this.productCart.push(object);
    localStorage.setItem('cart-' + numCart, JSON.stringify(this.productCart));
  }



  // vérifier si le produit existe dans les autres paniers et si le stock est atteint
  VerifyIfStockRest(object) {
    const tabKeyCart = ['1', '2', '3'];
    let i = 0;
    let qte = 0;
    console.log('Boucle de vérification de stocks inter panier');

    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < tabKeyCart.length; j++) {
      const cartSpecific = JSON.parse(localStorage.getItem('cart-' + tabKeyCart[j]));
      cartSpecific.forEach(element => {
        if (Number(element.identify) === Number(object.identify)) {
          qte  += Number(element.quantity);
          // console.log(qte);
          if (Number(qte) === Number(object.stock)) {
            console.log('produit hors stock');
            i += 1;
          }
        }
      });
    }
    console.log('Quantité : ' + qte);
    console.log('Etat numerique du stock : ' + i);
    return i;
  }
}
