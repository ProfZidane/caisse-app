import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { PdfService } from './pdf.service';

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
  constructor(private s: MatSnackBar, private pdfService: PdfService, private http: HttpClient) { }

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
        stock : object.stock,
        progress : this.in_progress
      };
      const tab = [data];
      console.log(this.tab);

      this.tab.push(data);
      localStorage.setItem('cart', JSON.stringify(this.tab));

      this.s.open('Votre produit a bien été ajouter au panier', 'OK');

    } else {
      let tab = JSON.parse(localStorage.getItem('cart'));
      console.log(this.tab);

      this.tab.forEach(element => {
        if (element.identify === object.id && element.progress === this.in_progress) {
          if (element.quantity < element.stock) {
            console.log('rrr');
            element.quantity ++;
            //this.tab.push(element);
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
          //tab.push(data);
          this.tab.push(data);
          localStorage.setItem('cart', JSON.stringify(this.tab));
          this.s.open('Votre produit a bien été ajouter au panier', 'OK');
          this.state = 0;
      } else if (this.state > 0) {

        //alert('Votre produit est déjà dans le panier !');

        this.s.open('Quantité augmentée !', 'OK');
        this.state = 0;
      } else if (this.state < 0) {
        this.s.open('Cet produit ne peut être choisie. Son stock est limité !', 'OK');
      }
      console.log(this.state);

    }

  }


  GetProductToCart() {
    //console.log(this.in_progress);
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
    //console.log(this.renderer);
    return this.renderer;
    // console.log(this.renderer);
  }


  UpdateCart() {
    localStorage.setItem('cart', JSON.stringify(this.tab));
  }

  GetTotal() {
    //this.total = 0;
    const inP = JSON.parse(localStorage.getItem('inProgress'));
    if (this.tab) {
      let tt;
      this.total = 0;
      this.tab.forEach(element => {
        if (element.progress === inP.in) {
          tt = element.price * element.quantity;
          this.total = tt + this.total;
        }
        //console.log(this.total);

      });
      //console.log(tt);

      return this.total;
    }
  }


  ClearProduct(id) {
    //console.log(this.tab.indexOf(id));
    if (this.tab.indexOf(id) !== -1) {
      this.tab.splice(this.tab.indexOf(id), 1);
    }

    //console.log(this.tab);
    let tab = JSON.parse(localStorage.getItem('cart'));
    const filteredCart = this.tab.filter((item) => item.identify !== id.id);
    //console.log(filteredCart);
    // tslint:disable-next-line:no-unused-expression
    localStorage.setItem('cart', JSON.stringify(filteredCart));

  }

  InscreaseQuantity(id) {
    let tab = JSON.parse(localStorage.getItem('cart'));
    tab.forEach(element => {
      if (element.identify === id) {
        if (element.quantity < element.stock) {
          element.quantity ++;
        } else {
          this.s.open('Cet produit ne peut être choisie. Son stock est limité !', 'OK');
        }
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


  Checkout(object): Observable<any> {
    // console.log(object);
    const panier = JSON.parse(localStorage.getItem('cart'));
    const customer = JSON.parse(localStorage.getItem('customerChoice'));
    const inProg = JSON.parse(localStorage.getItem('inProgress'));
    const subtotal = JSON.parse(localStorage.getItem('total'));
    const cart = [];

    panier.forEach(element => {
      if (element.progress === inProg.in) {
        let newProduct = {
          id : element.identify,
          price : element.price,
          quantity : element.quantity,
          amout : Number(element.price) * Number(element.quantity),
          slug : element.slug
        };
        cart.push(newProduct);
      }
    });


    console.log(cart);

    if (object.typePaiement === 'especes') {
      const register = {
        typePaiement : object.typePaiement,
        caissier : '',
        subtotal : subtotal,
        total : object.total,
        exchange : object.exchange,
        client : customer,
        livraison : object.livraison,
        reduction : object.reduction,
        produit : cart
      };
      console.log(register);
      this.register = register;
    } else if (object.typePaiement === 'carte' || object.typePaiement === 'cheque') {
      const register = {
        typePaiement : object.typePaiement,
        check : object.check,
        caissier : '',
        subtotal : subtotal,
        total : object.total,
        client : customer,
        livraison : object.livraison,
        reduction : object.reduction,
        produit : cart
      };
      console.log(register);
      this.register = register;


    } else if (object.typePaiement === 'mobile-money') {
      const register = {
        typePaiement : object.typePaiement,
        mobile : object.mobile,
        caissier : '',
        subtotal : subtotal,
        total : object.total,
        client : customer,
        livraison : object.livraison,
        reduction : object.reduction,
        produit : cart
      };
      console.log(register);
      this.register = register;

    }
     // const caissier = JSON.parse(localStorage.getItem('userData'));
    // const caissier = caissier.id;
    // console.log(customer);
    // console.log(cart);
    // console.log(total);
    return this.http.post(this.registerURL, this.register);
  }

  // Générer pdf pour ticket de caisse
  starterGenerateTicket() {
    const objectProductPdf = [];
    let remise = '';
    this.register.produit.forEach(elt => {
      let newObject = [
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
      if (this.register.reduction.type === 'percent') {
        remise = this.register.reduction.value.toString() + '%';
      } else if (this.register.reduction.type === 'fixed') {
        remise = this.register.reduction.value.toString() + ' Fcfa';
      }
    } else {
      remise = 'aucune';
    }
    this.dataToPdf = {
      customer : this.register.client,
      vendeur : this.register.caissier,
      date : new Date().toLocaleDateString(),
      produit : objectProductPdf,
      total : this.register.total,
      remise : remise
    };

    this.pdfService.generatePdf(this.dataToPdf);
  }


}
