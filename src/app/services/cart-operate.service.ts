import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartOperateService {
state = 0;
// tslint:disable-next-line:variable-name
in_progress: any;
  constructor(private s: MatSnackBar) { }

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


    InsertToLocalCart(id) {

    this.VerifyInProgress();

    if (localStorage.getItem('cart') === null) {

      const data = {
        identify : id,
        quantity : 1,
        progress : this.in_progress
      };
      const tab = [data];

      localStorage.setItem('cart', JSON.stringify(tab));

      this.s.open('Votre produit a bien été ajouter au panier', 'OK');

    } else {
      let tab = JSON.parse(localStorage.getItem('cart'));
      console.log(tab);

      tab.forEach(element => {
        if (element.identify === id && element.progress === this.in_progress) {
          console.log('rrr');
          element.quantity ++;
          localStorage.setItem('cart', JSON.stringify(tab));

          this.state ++;
        }
      });

      if (this.state === 0) {
          const data = {
            identify : id,
            quantity : 1,
            progress : this.in_progress
          };
          tab.push(data);
          localStorage.setItem('cart', JSON.stringify(tab));
          this.s.open('Votre produit a bien été ajouter au panier', 'OK');
          this.state = 0;
      } else {

        //alert('Votre produit est déjà dans le panier !');

        this.s.open('Quantité augmentée !', 'OK');
        this.state = 0;
      }
    }

  }


  GetProductToCart() {
    let tab = JSON.parse(localStorage.getItem('cart'));
    return tab;
  }


  ClearProduct(id) {
    let tab = JSON.parse(localStorage.getItem('cart'));
    const filteredCart = tab.filter((item) => item.identify !== id);
    console.log(filteredCart);
    localStorage.setItem('cart', JSON.stringify(filteredCart));

  }

  InscreaseQuantity(id) {
    let tab = JSON.parse(localStorage.getItem('cart'));
    tab.forEach(element => {
      if (element.identify === id) {
        element.quantity ++;
      }
    });
    localStorage.setItem('cart', JSON.stringify(tab));
  }


  DicreaseQuantity(id) {
    let tab = JSON.parse(localStorage.getItem('cart'));
    tab.forEach(element => {
      if (element.identify === id) {
        if (element.quantity > 0) {
          element.quantity --;
        } else {
          alert('Vous ne pouvez pas decendre en produit négatif !');
        }
      }
    });
    localStorage.setItem('cart', JSON.stringify(tab));
  }


  ChangeOnglet(value) {
    if (localStorage.getItem('inProgress') === null) {
      alert('Veuillez utilisez la fenêtre présente !');
    } else {
      let in_progress_value = JSON.parse(localStorage.getItem('inProgress'));
      console.log(in_progress_value);
      in_progress_value.in = value;
      localStorage.setItem('inProgress', JSON.stringify(in_progress_value));

    }
  }

}
