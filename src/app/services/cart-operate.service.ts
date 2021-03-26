import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartOperateService {
state = 0;
// tslint:disable-next-line:variable-name
in_progress: any;
tab = [];
total = 0;
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


    InsertToLocalCart(object) {

    this.VerifyInProgress();

    if (localStorage.getItem('cart') === null) {

      const data = {
        identify : object.id,
        name : object.title,
        img : object.photo,
        price : object.price,
        slug : object.slug,
        quantity : 1,
        progress : this.in_progress
      };
      const tab = [data];
      console.log(this.tab);

      this.tab.push(data);
      localStorage.setItem('cart', JSON.stringify(this.tab));

      this.s.open('Votre produit a bien été ajouter au panier', 'OK');

    } else {
      let tab = JSON.parse(localStorage.getItem('cart'));
      console.log(tab);

      tab.forEach(element => {
        if (element.identify === object.id && element.progress === this.in_progress) {
          console.log('rrr');
          element.quantity ++;
          //this.tab.push(element);
          localStorage.setItem('cart', JSON.stringify(this.tab));

          this.state ++;
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
            progress : this.in_progress
          };
          //tab.push(data);
          this.tab.push(data);
          localStorage.setItem('cart', JSON.stringify(this.tab));
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
    this.tab = JSON.parse(localStorage.getItem('cart'));
    return this.tab;
  }


  UpdateCart() {
    localStorage.setItem('cart', JSON.stringify(this.tab));
  }

  GetTotal() {
    //this.total = 0;
    if (this.tab) {
      let tt;
      this.total = 0;
      this.tab.forEach(element => {
        tt = element.price * element.quantity;
        this.total = tt + this.total;
        console.log(this.total);

      });
      console.log(tt);

      return this.total;
    }
  }


  ClearProduct(id) {
    console.log(this.tab.indexOf(id));
    if (this.tab.indexOf(id) !== -1) {
      this.tab.splice(this.tab.indexOf(id), 1);
    }

    //console.log(this.tab);
    let tab = JSON.parse(localStorage.getItem('cart'));
    const filteredCart = this.tab.filter((item) => item.identify !== id.id);
    console.log(filteredCart);
    // tslint:disable-next-line:no-unused-expression
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
