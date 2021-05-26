import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { PdfService } from './pdf.service';

import { ProductService } from './product.service';
import { Pdf2Service } from './pdf-2.service';

@Injectable({
  providedIn: 'root'
})
export class CartOperateService {
state = 0;
// tslint:disable-next-line:variable-name
in_progress: any;
tab = [];
total = 0;
renderer = [];
registerURL = 'https://accessoire-mode.lce-test.fr/api/caisse/storeOrder';
register;
dataToPdf;
existingCart;
cart = {
  cart_1: [],
  cart_2: [],
  cart_3: []
};
  constructor(private s: MatSnackBar, private pdfService: PdfService, private http: HttpClient, private productService: ProductService,
              private pdf2Service: Pdf2Service) { }

  // get token and set this in headers
  getHeaders() {
    if (localStorage.getItem('word_token') !== null) {
      const headers = new HttpHeaders({
        'Content-type' : 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('word_token')).token
      });
      return headers;
    }
  }
  VerifyInProgress() {
    if (localStorage.getItem('inProgress') === null) {
      const inProgress = {
        in : 1
      };
      localStorage.setItem('inProgress', JSON.stringify(inProgress));
      this.in_progress = inProgress.in;

    } else {

    const existprogress = JSON.parse(localStorage.getItem('inProgress'));
    this.in_progress = existprogress.in;

  }

}

// Retourner le state des paniers
 CountingExistingCart() {
  const carts = JSON.parse(localStorage.getItem('cart'));
  console.log(carts);

  this.existingCart = carts[0];
  return this.existingCart;
}


// Attribuer classe après génération
AttributeActiveToLink() {
  const first = document.getElementById('first');
  const second = document.getElementById('second');
  const third = document.getElementById('third');
  const inP = JSON.parse(localStorage.getItem('inProgress'));
  console.log('eee');

  if (Number(inP.in) === 1) {
    console.log('1');
    if (first) {
      first.classList.add('active');
      first.setAttribute('aria-selected', 'true');
    }
    if (second) {
      second.classList.remove('active');
      second.setAttribute('aria-selected', 'false');
    }
    if (third) {
      third.classList.remove('active');
      third.setAttribute('aria-selected', 'false');
    }
  } else if (Number(inP.in) === 2) {
    console.log('2');

    if (first) {
      first.classList.remove('active');
      first.setAttribute('aria-selected', 'false');
    }
    if (second) {
      second.classList.add('active');
      second.setAttribute('aria-selected', 'true');
    }
    if (third) {
      third.classList.remove('active');
      third.setAttribute('aria-selected', 'false');
    }
  } else if (Number(inP.in) === 3) {
    console.log('3');

    if (first) {
      first.classList.remove('active');
      first.setAttribute('aria-selected', 'false');
    }
    if (second) {
      second.classList.remove('active');
      second.setAttribute('aria-selected', 'false');
    }
    if (third) {
      third.classList.add('active');
      third.setAttribute('aria-selected', 'true');
    }
  }
}

// Creation d'onglet (panier)
CreatingTab(): void {
  this.VerifyInProgress();
  // const productToSpecificCArt = this.productService.GetProductInCart(numCart);
  const verifyEmptyCart = this.productService.GetEmptyCart();
  if (verifyEmptyCart.length === 0) {
    // alert('les paniers sont limites a trois 3');
    console.log('Possibilite de non activation');
    if (this.existingCart['2'] === false) {
      this.existingCart['2'] = true;
      localStorage.setItem('cart', JSON.stringify([this.existingCart]));
      // tslint:disable-next-line:variable-name
      const in_progress_value = JSON.parse(localStorage.getItem('inProgress'));
      in_progress_value.in = 2;
      localStorage.setItem('inProgress', JSON.stringify(in_progress_value));
    //  this.AttributeActiveToLink();
    } else if (this.existingCart['3'] === false) {
      this.existingCart['3'] = true;
      localStorage.setItem('cart', JSON.stringify([this.existingCart]));
      // tslint:disable-next-line:variable-name
      const in_progress_value = JSON.parse(localStorage.getItem('inProgress'));
      in_progress_value.in = 3;
      localStorage.setItem('inProgress', JSON.stringify(in_progress_value));
    //  this.AttributeActiveToLink();
    }
  } else {
    if (verifyEmptyCart.includes('1')) {
      // alert('Veuillez utiliser le panier 1 qui est toujours vide !');
      this.s.open('Veuillez utiliser le panier 1 qui est toujours vide !', 'OK');

      // if (document.getElementById('first')) {
      //   document.getElementById('first').classList.add('active');
      //   document.getElementById('first').setAttribute('aria-selected', 'true');
      // }
      // if (document.getElementById('second')) {
      //   document.getElementById('second').classList.remove('active');
      //   document.getElementById('second').setAttribute('aria-selected', 'false');
      // }
      // if (document.getElementById('third')) {
      //   document.getElementById('third').classList.remove('active');
      //   document.getElementById('third').setAttribute('aria-selected', 'false');
      // }
      const in_progress_value = JSON.parse(localStorage.getItem('inProgress'));
      in_progress_value.in = 1;
      localStorage.setItem('inProgress', JSON.stringify(in_progress_value));
    } else if (verifyEmptyCart.includes('2')) {
      // alert('Veuillez utiliser le panier 2 qui est toujours vide !');
      this.s.open('Veuillez utiliser le panier 2 qui est toujours vide !', 'OK');

      // if (document.getElementById('first')) {
      //   document.getElementById('first').classList.remove('active');
      //   document.getElementById('first').setAttribute('aria-selected', 'false');
      // }
      // if (document.getElementById('second')) {
      //   document.getElementById('second').classList.add('active');
      //   document.getElementById('second').setAttribute('aria-selected', 'true');
      // }
      // if (document.getElementById('third')) {
      //   document.getElementById('third').classList.remove('active');
      //   document.getElementById('third').setAttribute('aria-selected', 'false');
      // }
      const in_progress_value = JSON.parse(localStorage.getItem('inProgress'));
      in_progress_value.in = 2;
      localStorage.setItem('inProgress', JSON.stringify(in_progress_value));
    } else if (verifyEmptyCart.includes('3')) {
      // alert('Veuillez utiliser le panier 3 qui est toujours vide !');
      this.s.open('Veuillez utiliser le panier 3 qui est toujours vide !', 'OK');

      // if (document.getElementById('first')) {
      //   document.getElementById('first').classList.remove('active');
      //   document.getElementById('first').setAttribute('aria-selected', 'false');
      // }
      // if (document.getElementById('second')) {
      //   document.getElementById('second').classList.remove('active');
      //   document.getElementById('second').setAttribute('aria-selected', 'false');
      // }
      // if (document.getElementById('third')) {
      //   document.getElementById('third').classList.add('active');
      //   document.getElementById('third').setAttribute('aria-selected', 'true');
      // }
      const in_progress_value = JSON.parse(localStorage.getItem('inProgress'));
      in_progress_value.in = 3;
      localStorage.setItem('inProgress', JSON.stringify(in_progress_value));
    }
  }
}


// Réduire les onglets (panier)
DesactiveCart() {
  const existing = this.existingCart;
  if (existing['3'] === true) {
    existing['3'] = false;
    const in_progress_value = JSON.parse(localStorage.getItem('inProgress'));
    in_progress_value.in = 2;
    localStorage.setItem('inProgress', JSON.stringify(in_progress_value));
    localStorage.setItem('cart', JSON.stringify([existing]));
    localStorage.setItem('cart-3', JSON.stringify([]));
  } else if (existing['2'] === true) {
    existing['2'] = false;
    const in_progress_value = JSON.parse(localStorage.getItem('inProgress'));
    in_progress_value.in = 1;
    localStorage.setItem('inProgress', JSON.stringify(in_progress_value));
    localStorage.setItem('cart', JSON.stringify([existing]));
    localStorage.setItem('cart-2', JSON.stringify([]));
  }
  console.log(existing);
}


VerifyExistingInCart(num, object) {
  const productToCart = this.productService.GetProductInCart(num);
  const count = 0;
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < productToCart.length; i++) {
    if (Number(productToCart[i].identify) === Number(object.identify)) {
      // console.log('il sagit du meme produit !');
      return true;
    }
  }
}






    InsertToLocalCart(object) {

    this.VerifyInProgress();

    if (localStorage.getItem('cart') !== null) {

      const data = {
        identify : object.id,
        name : object.title,
        img : object.photo,
        price : object.price,
        slug : object.slug,
        quantity : 1,
        stock : object.stock,
        progress : this.in_progress
      };
      // const tab = [data];
     // console.log(this.tab);

      if (this.in_progress === 1) {
        console.log('il sagit du panier 1');
        if (this.VerifyExistingInCart('1', data)) {
          console.log('mise a jour de la quantite + ' + data.quantity);
          if (this.productService.VerifyIfStockRest(data) <= 0) {
            this.productService.SetQuantityProductToCart('1', data);
          } else {
            this.s.open('Votre produit n\'est plus disponible', 'OK');
          }
        } else {
          console.log('insertion de produit dans le panier');
          if (this.productService.VerifyIfStockRest(data) <= 0) {
            this.productService.SetProductToCart('1', data);
            this.s.open('Votre produit a bien été ajouter au panier', 'OK');
          } else {
            this.s.open('Votre produit n\'est plus disponible', 'OK');
          }
        }
      } else if (this.in_progress === 2) {
        console.log('il sagit du panier 2');
        if (this.VerifyExistingInCart('2', data)) {
          console.log('mise a jour de la quantite + ' + data.quantity);
          if (this.productService.VerifyIfStockRest(data) <= 0) {
            this.productService.SetQuantityProductToCart('2', data);
          } else {
            this.s.open('Votre produit n\'est plus disponible', 'OK');
          }
        } else {
          console.log('insertion de produit dans le panier');
          if (this.productService.VerifyIfStockRest(data) <= 0) {
            this.productService.SetProductToCart('2', data);
            this.s.open('Votre produit a bien été ajouter au panier', 'OK');
          } else {
            this.s.open('Votre produit n\'est plus disponible', 'OK');
          }
        }
      } else if (this.in_progress === 3) {
        console.log('il sagit du panier 3');
        if (this.VerifyExistingInCart('3', data)) {
          console.log('mise a jour de la quantite + ' + data.quantity);
          if (this.productService.VerifyIfStockRest(data) <= 0) {
            this.productService.SetQuantityProductToCart('3', data);
          } else {
            this.s.open('Votre produit n\'est plus disponible', 'OK');
          }
        } else {
          console.log('insertion de produit dans le panier');
          if (this.productService.VerifyIfStockRest(data) <= 0) {
            this.productService.SetProductToCart('3', data);
            this.s.open('Votre produit a bien été ajouter au panier', 'OK');
          } else {
            this.s.open('Votre produit n\'est plus disponible', 'OK');
          }
        }
      }

      /*this.tab.push(data);
      localStorage.setItem('cart', JSON.stringify(this.tab));

      this.s.open('Votre produit a bien été ajouter au panier', 'OK');

    } else {
      const tab = JSON.parse(localStorage.getItem('cart'));
      console.log(this.tab);

      this.tab.forEach(element => {
        if (element.identify === object.id && element.progress === this.in_progress) {
          if (element.quantity < element.stock) {
            console.log('rrr');
            element.quantity ++;
            // this.tab.push(element);
            console.log(element);

            localStorage.setItem('cart', JSON.stringify(this.tab));

            this.state ++;
          } else {
            this.state = -1;
          }
        }
      });

      if (this.state === 0) {
          const data = {
            identify : object.id,
            name : object.title,
            img : object.photo,
            price : object.price,
            slug : object.slug,
            quantity : 1,
            stock : object.stock,
            progress : this.in_progress
          };
          // tab.push(data);
          this.tab.push(data);
          localStorage.setItem('cart', JSON.stringify(this.tab));
          this.s.open('Votre produit a bien été ajouter au panier', 'OK');
          this.state = 0;
      } else if (this.state > 0) {

        // alert('Votre produit est déjà dans le panier !');

        this.s.open('Quantité augmentée !', 'OK');
        this.state = 0;
      } else if (this.state < 0) {
        this.s.open('Cet produit ne peut être choisie. Son stock est limité !', 'OK');
      }
      console.log(this.state);*/

    }

  }

  GetProductToCart1() {
    this.cart.cart_1 = JSON.parse(localStorage.getItem('cart-1'));
    return this.cart.cart_1;
  }

  GetProductToCart2() {
    this.cart.cart_2 = JSON.parse(localStorage.getItem('cart-2'));
    return this.cart.cart_2;
  }

  GetProductToCart3() {
    this.cart.cart_3 = JSON.parse(localStorage.getItem('cart-3'));
    return this.cart.cart_3;
  }


  GetProductToCart() {
    // console.log(this.in_progress);
    /*const inP = JSON.parse(localStorage.getItem('inProgress'));
    const pp = JSON.parse(localStorage.getItem('cart'));
    this.tab.forEach(element => {
        if (element.progress === inP.in) {
          this.tab.push(element);
        }
    });
    console.log(this.tab);*/

    this.tab = JSON.parse(localStorage.getItem('cart'));
    return this.tab;
  }


  LoadTrueDataToCart() {
    const truthData = this.GetProductToCart();
    const tableau = [];
    const inP = JSON.parse(localStorage.getItem('inProgress'));
    truthData.forEach(elt => {
        if (elt.progress === inP.in) {
          tableau.push(elt);
        }
      });
    this.renderer = tableau;
    // console.log(this.renderer);
    return this.renderer;
    // console.log(this.renderer);
  }



  // Calculer le total par panier
  GetTotal() {

    const indice = JSON.parse(localStorage.getItem('inProgress'));

    if (indice.in === 1) {
      console.log('calcul du total du panier 1 : ' + this.total + ' Fcfa');
      const tab = JSON.parse(localStorage.getItem('cart-1'));
      let tt;
      this.total = 0;
      tab.forEach(element => {
          tt = element.price * element.quantity;
          this.total = tt + this.total;
      });

    // tslint:disable-next-line:indent
      return this.total;

    } else if (indice.in === 2) {
      console.log('calcul du total du panier 2 : ' + this.total + ' Fcfa');
      const tab = JSON.parse(localStorage.getItem('cart-2'));
      let tt;
      this.total = 0;
      tab.forEach(element => {
          tt = element.price * element.quantity;
          this.total = tt + this.total;
      });

      // tslint:disable-next-line:indent
	     return this.total;

    } else if (indice.in === 3) {
      console.log('calcul du total du panier 3 : ' + this.total + ' Fcfa');
      const tab = JSON.parse(localStorage.getItem('cart-3'));
      let tt;
      this.total = 0;
      tab.forEach(element => {
          tt = element.price * element.quantity;
          this.total = tt + this.total;
      });

      return this.total;
    }
  }


  // fonction de suppression des paniers
  ClearProduct(id) {
    const indice = JSON.parse(localStorage.getItem('inProgress'));

    if (indice.in === 1) {
      console.log('supression au panier 1');
      const tab = JSON.parse(localStorage.getItem('cart-1'));
      const filteredCart = tab.filter((item) => item.identify !== id.identify);
      console.log(filteredCart);
      localStorage.setItem('cart-1', JSON.stringify(filteredCart));

    } else if (indice.in === 2) {
      console.log('supression au panier 2');
      const tab = JSON.parse(localStorage.getItem('cart-2'));
      if (tab.indexOf(id) !== -1) {
        tab.splice(tab.indexOf(id), 1);
      }
      const filteredCart = tab.filter((item) => item.identify !== id.identify);
      console.log(filteredCart);
      localStorage.setItem('cart-2', JSON.stringify(filteredCart));

    } else if (indice.in === 3) {
      console.log('supression au panier 3');
      const tab = JSON.parse(localStorage.getItem('cart-3'));
      if (tab.indexOf(id) !== -1) {
        tab.splice(tab.indexOf(id), 1);
      }
      const filteredCart = tab.filter((item) => item.identify !== id.identify);
      console.log(filteredCart);
      localStorage.setItem('cart-3', JSON.stringify(filteredCart));
    }

  }


  // fonction d'augmentation de quantite en fonction des paniers
  InscreaseQuantity(id) {
    const indice = JSON.parse(localStorage.getItem('inProgress'));

    if (indice.in === 1) {
      console.log('augmentation de la quantite au panier 1 du prod ' + id);
      const tab = JSON.parse(localStorage.getItem('cart-1'));
      tab.forEach(element => {
        if (element.identify === id) {
          if (this.productService.VerifyIfStockRest(element) <= 0) {
            element.quantity ++;
          } else {
            this.s.open('Cet produit ne peut être choisie. Son stock est limité !', 'OK');
          }
        }
      });
      localStorage.setItem('cart-1', JSON.stringify(tab));

    } else if (indice.in === 2) {
      console.log('augmentation de la quantite au panier 2 du prod ' + id);
      const tab = JSON.parse(localStorage.getItem('cart-2'));
      tab.forEach(element => {
        if (element.identify === id) {
          if (this.productService.VerifyIfStockRest(element) <= 0) {
            element.quantity ++;
          } else {
            this.s.open('Cet produit ne peut être choisie. Son stock est limité !', 'OK');
          }
        }
      });
      localStorage.setItem('cart-2', JSON.stringify(tab));

    } else if (indice.in === 3) {
      console.log('augmentation de la quantite au panier 3 du prod ' + id);
      const tab = JSON.parse(localStorage.getItem('cart-3'));
      tab.forEach(element => {
        if (element.identify === id) {
          if (this.productService.VerifyIfStockRest(element) <= 0) {
            element.quantity ++;
          } else {
            this.s.open('Cet produit ne peut être choisie. Son stock est limité !', 'OK');
          }
        }
      });
      localStorage.setItem('cart-3', JSON.stringify(tab));
    }
  }



  // fonction de réduction de quantite en fonction des paniers
  DicreaseQuantity(id) {
    const indice = JSON.parse(localStorage.getItem('inProgress'));

    if (indice.in === 1) {
      console.log('niveau réduction de la quantite au panier 1 du prod ' + id);

      const tab = JSON.parse(localStorage.getItem('cart-1'));
      tab.forEach(element => {
        if (element.identify === id) {
          if (element.quantity > 1) {
            element.quantity --;
          } else {
            this.s.open('Veuillez supprimer directement le produit !', 'OK');
          }
        }
      });
      localStorage.setItem('cart-1', JSON.stringify(tab));

    } else if (indice.in === 2) {
      console.log('niveau réduction de la quantite au panier 2 du prod ' + id);

      const tab = JSON.parse(localStorage.getItem('cart-2'));
      tab.forEach(element => {
        if (element.identify === id) {
          if (element.quantity > 1) {
            element.quantity --;
          } else {
            this.s.open('Veuillez supprimer directement le produit !', 'OK');
          }
        }
      });
      localStorage.setItem('cart-2', JSON.stringify(tab));

    } else if (indice.in === 3) {
      console.log('niveau réduction de la quantite au panier 3 du prod ' + id);

      const tab = JSON.parse(localStorage.getItem('cart-3'));
      tab.forEach(element => {
        if (element.identify === id) {
          if (element.quantity > 1) {
            element.quantity --;
          } else {
            this.s.open('Veuillez supprimer directement le produit !', 'OK');
          }
        }
      });
      localStorage.setItem('cart-3', JSON.stringify(tab));
    }
  }


  // basculer d'onglet à onglet
    ChangeOnglet(value) {
    if (localStorage.getItem('inProgress') === null) {
      alert('Veuillez utilisez la fenêtre présente !');
    } else {
      const in_progress_value = JSON.parse(localStorage.getItem('inProgress'));
      console.log(in_progress_value);
      in_progress_value.in = value;
      localStorage.setItem('inProgress', JSON.stringify(in_progress_value));

    }
  }


  // Validation du panier pour paiement
  Checkout(object): Observable<any> {
    // console.log(object);
    console.log('Validation du paiement en cours ...');
    const customer = JSON.parse(localStorage.getItem('customerChoice'));
    const inProg = JSON.parse(localStorage.getItem('inProgress'));
    const subtotal = JSON.parse(localStorage.getItem('total'));
    const cart = [];
    const indice = JSON.parse(localStorage.getItem('inProgress'));

    if (object.mode === 'old') {
      if (object.typePaiement === 'especes') {
        console.log('choix du paiement : cash');
        const register = {
          typePaiement : object.typePaiement,
          caissier : JSON.parse(localStorage.getItem('caissier')).id,
          subtotal,
          total : object.total,
          montant_recu: Number(object.montant_recu),
          exchange : object.exchange,
          client : customer,
          livraison : object.livraison,
          reduction : object.reduction,
          mode : object.mode,
          numOrder: object.numOrder,
          produit : JSON.parse(localStorage.getItem('cart-' + inProg.in))
        };
        this.register = register;
      } else if (object.typePaiement === 'carte' || object.typePaiement === 'cheque') {
        console.log('choix du paiement : carte ou chèque');
        const register = {
          typePaiement : object.typePaiement,
          check : object.check,
          caissier : JSON.parse(localStorage.getItem('caissier')).id,
          subtotal,
          total : object.total,
          montant_recu: Number(object.montant_recu),
          client : customer,
          livraison : object.livraison,
          reduction : object.reduction,
          produit : JSON.parse(localStorage.getItem('cart-' + inProg.in)),
          mode : object.mode,
          numOrder: object.numOrder,
        };
        this.register = register;


      } else if (object.typePaiement === 'mobile-money') {
        console.log('choix du paiement : mobile money');
        const register = {
          typePaiement : object.typePaiement,
          mobile : object.mobile,
          caissier : JSON.parse(localStorage.getItem('caissier')).id,
          subtotal,
          total : object.total,
          montant_recu: Number(object.montant_recu),
          client : customer,
          livraison : object.livraison,
          reduction : object.reduction,
          produit : JSON.parse(localStorage.getItem('cart-' + inProg.in)),
          mode : object.mode,
          numOrder: object.numOrder
        };
        this.register = register;

      } else if (object.typePaiement === 'echelonner') {
        console.log('choix du paiement : échelonner');
        const register = {
          typePaiement : object.typePaiement,
          caissier : JSON.parse(localStorage.getItem('caissier')).id,
          subtotal,
          total : object.total,
          montant_recu: Number(object.montant_recu),
          exchange : object.exchange,
          client : customer,
          livraison : object.livraison,
          reduction : object.reduction,
          produit : JSON.parse(localStorage.getItem('cart-' + inProg.in)),
          mode : object.mode,
          numOrder: object.numOrder
        };
        this.register = register;
      }
    } else {
      if (indice.in === 1) {
        console.log('Il s\'agit là, du panier 1');
        const panier = JSON.parse(localStorage.getItem('cart-1'));
        panier.forEach(element => {
          if (element.progress === inProg.in) {
            const newProduct = {
              id : element.identify,
              price : element.price,
              quantity : element.quantity,
              amout : Number(element.price) * Number(element.quantity),
              slug : element.slug
            };
            cart.push(newProduct);
          }
        });
      } else if (indice.in === 2) {
        console.log('Il s\'agit là, du panier 2');
        const panier = JSON.parse(localStorage.getItem('cart-2'));
        panier.forEach(element => {
          if (element.progress === inProg.in) {
            const newProduct = {
              id : element.identify,
              price : element.price,
              quantity : element.quantity,
              amout : Number(element.price) * Number(element.quantity),
              slug : element.slug
            };
            cart.push(newProduct);
          }
        });
      } else if (indice.in === 3) {
        console.log('Il s\'agit là, du panier 3');
        const panier = JSON.parse(localStorage.getItem('cart-3'));
        panier.forEach(element => {
          if (element.progress === inProg.in) {
            const newProduct = {
              id : element.identify,
              price : element.price,
              quantity : element.quantity,
              amout : Number(element.price) * Number(element.quantity),
              slug : element.slug
            };
            cart.push(newProduct);
          }
        });
      }


      console.log(cart);

      if (object.typePaiement === 'especes') {
        console.log('choix du paiement : cash');
        const register = {
          typePaiement : object.typePaiement,
          caissier : JSON.parse(localStorage.getItem('caissier')).id,
          subtotal,
          total : object.total,
          montant_recu: Number(object.montant_recu),
          exchange : object.exchange,
          client : customer,
          livraison : object.livraison,
          reduction : object.reduction,
          produit : cart,
          mode : object.mode,
          avoir: object.avoir
        };
        this.register = register;
      } else if (object.typePaiement === 'carte' || object.typePaiement === 'cheque') {
        console.log('choix du paiement : carte ou chèque');
        const register = {
          typePaiement : object.typePaiement,
          check : object.check,
          caissier : JSON.parse(localStorage.getItem('caissier')).id,
          subtotal,
          total : object.total,
          montant_recu: Number(object.montant_recu),
          client : customer,
          livraison : object.livraison,
          reduction : object.reduction,
          produit : cart,
          mode : object.mode,
          avoir: object.avoir
        };
        this.register = register;


      } else if (object.typePaiement === 'mobile-money') {
        console.log('choix du paiement : mobile money');
        const register = {
          typePaiement : object.typePaiement,
          mobile : object.mobile,
          caissier : JSON.parse(localStorage.getItem('caissier')).id,
          subtotal,
          total : object.total,
          montant_recu: Number(object.montant_recu),
          client : customer,
          livraison : object.livraison,
          reduction : object.reduction,
          produit : cart,
          mode : object.mode,
          avoir: object.avoir
        };
        this.register = register;

      } else if (object.typePaiement === 'echelonner') {
        console.log('choix du paiement : échelonner');
        const register = {
          typePaiement : object.typePaiement,
          caissier : JSON.parse(localStorage.getItem('caissier')).id,
          subtotal,
          total : object.total,
          montant_recu: Number(object.montant_recu),
          exchange : object.exchange,
          client : customer,
          livraison : object.livraison,
          reduction : object.reduction,
          produit : cart,
          mode : object.mode,
          avoir: object.avoir
        };
        this.register = register;
      }
    }
    console.log(this.register);

    return this.http.post(this.registerURL, this.register, { headers: this.getHeaders() });
  }

  // Générer pdf pour ticket de caisse
  starterGenerateTicket() {
    const objectProductPdf = [];
    let remise = '';
    let exchangePoint = '';
    this.register.produit.forEach(elt => {
      const newObject = [
        {
          border : [false, false, false, false],
          text : elt.quantity.toString(),
          fontSize : 8,
          alignment : 'center',
        },
        {
          border : [false, false, false, false],
          text : elt.slug,
          fontSize : 8,
          alignment : 'center',
        },
        {
          border : [false, false, false, false],
          text : elt.price.toString(),
          fontSize : 8,
          alignment : 'center',
        },
        {
          border : [false, false, false, false],
          text : elt.amout.toString(),
          fontSize : 8,
          alignment : 'center',
        }
      ];
      objectProductPdf.push(newObject);
    });
    console.log(objectProductPdf);
    if (this.register.reduction.state === true) {
      /*if (this.register.reduction.type === 'percent') {
        remise = this.register.reduction.valeur.toString() + '%';
      } else if (this.register.reduction.type === 'fixed') {
        remise = this.register.reduction.valeur.toString() + ' Fcfa';
      }*/
      remise = this.register.reduction.valeur.toString() + ' Fcfa';
    } else {
      remise = 'aucune';
    }

    if (this.register.exchange) {
      if (Number(this.register.exchange) < 0) {
        exchangePoint = (Number(this.register.exchange) * -1).toString();
      } else {
        exchangePoint = '0';
      }
    } else {
      exchangePoint = '0';
    }
    this.dataToPdf = {
      customer : this.register.client,
      vendeur : this.register.caissier,
      date : new Date().toLocaleDateString(),
      produit : objectProductPdf,
      sub_total: this.register.subtotal,
      total : this.register.total,
      exchange: exchangePoint,
      montant_recu: this.register.montant_recu,
      remise
    };

    this.pdfService.generatePdf(this.dataToPdf);
  }


  // créer pdf pour les factures échelonné
  GenerateFactureEchelonne() {
    const objectProductPdf = [];
    let remise = '';
    let exchangePoint = '';
    this.register.produit.forEach(elt => {
      const newObject = [
        {
          border : [false, false, false, false],
          text : elt.quantity.toString(),
          fontSize : 8,
          alignment : 'center',
        },
        {
          border : [false, false, false, false],
          text : elt.slug,
          fontSize : 8,
          alignment : 'center',
        },
        {
          border : [false, false, false, false],
          text : elt.price.toString(),
          fontSize : 8,
          alignment : 'center',
        },
        {
          border : [false, false, false, false],
          text : elt.amout.toString(),
          fontSize : 8,
          alignment : 'center',
        }
      ];
      objectProductPdf.push(newObject);
    });
    console.log(objectProductPdf);
    if (this.register.reduction.state === true) {
      /*if (this.register.reduction.type === 'percent') {
        remise = this.register.reduction.valeur.toString() + '%';
      } else if (this.register.reduction.type === 'fixed') {
        remise = this.register.reduction.valeur.toString() + ' Fcfa';
      }*/
      remise = this.register.reduction.valeur.toString() + ' Fcfa';
    } else {
      remise = 'aucune';
    }

    if (this.register.exchange) {
      if (Number(this.register.exchange) < 0) {
        exchangePoint = (Number(this.register.exchange) * -1).toString();
      } else {
        exchangePoint = '0';
      }
    } else {
      exchangePoint = '0';
    }
    this.dataToPdf = {
      customer : this.register.client,
      vendeur : this.register.caissier,
      date : new Date().toLocaleDateString(),
      produit : objectProductPdf,
      subTotal: this.register.subtotal,
      total : this.register.total,
      exchange: exchangePoint,
      montant_recu: this.register.montant_recu,
      remise
    };

    this.pdf2Service.generatePdf(this.dataToPdf);

  }


  // Vérifier si panier est actif
  VerifyActiveCart() {
    const cartState = JSON.parse(localStorage.getItem('cart'));
    console.log(cartState);
    if (cartState['1'] !== false) {
      console.log('je passe le cap du premier panier');
      console.log(JSON.parse(localStorage.getItem('cart-1')));
      if (JSON.parse(localStorage.getItem('cart-1')).length === 0) {
        return 1;
      }
    } else if (cartState['2'] !== false) {
      console.log('je passe le cap du premier panier');
      if (JSON.parse(localStorage.getItem('cart-2')).length === 0) {
        return 2;
      }
    } else if (cartState['3'] !== false) {
      console.log('je passe le cap du premier panier');
      if (JSON.parse(localStorage.getItem('cart-3')).length === 0) {
        return 3;
      }
    }
  }


}
