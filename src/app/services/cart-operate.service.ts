import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { PdfService } from './pdf.service';
import { ProductService } from './product.service';

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
  constructor(private s: MatSnackBar, private pdfService: PdfService, private http: HttpClient, private productService: ProductService) { }

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
    existing['3'] == false;
    const in_progress_value = JSON.parse(localStorage.getItem('inProgress'));
    in_progress_value.in = 2;
    localStorage.setItem('inProgress', JSON.stringify(in_progress_value));
  } else if (existing['2'] === true) {
    existing['2'] = false;
    const in_progress_value = JSON.parse(localStorage.getItem('inProgress'));
    in_progress_value.in = 1;
    localStorage.setItem('inProgress', JSON.stringify(in_progress_value));
  }
  console.log(existing);
  localStorage.setItem('cart', JSON.stringify([existing]));
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


  UpdateCart() {
    localStorage.setItem('cart', JSON.stringify(this.tab));
  }

  GetTotal() {
    // this.total = 0;
    const inP = JSON.parse(localStorage.getItem('inProgress'));
    if (this.tab) {
      let tt;
      this.total = 0;
      this.tab.forEach(element => {
        if (element.progress === inP.in) {
          tt = element.price * element.quantity;
          this.total = tt + this.total;
        }
        // console.log(this.total);

      });
      // console.log(tt);

      return this.total;
    }
  }


  ClearProduct(id) {
    // console.log(this.tab.indexOf(id));
    if (this.tab.indexOf(id) !== -1) {
      this.tab.splice(this.tab.indexOf(id), 1);
    }

    // console.log(this.tab);
    const tab = JSON.parse(localStorage.getItem('cart'));
    const filteredCart = this.tab.filter((item) => item.identify !== id.id);
    // console.log(filteredCart);
    // tslint:disable-next-line:no-unused-expression
    localStorage.setItem('cart', JSON.stringify(filteredCart));

  }

  InscreaseQuantity(id) {
    const tab = JSON.parse(localStorage.getItem('cart'));
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
    const tab = JSON.parse(localStorage.getItem('cart'));
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
      const in_progress_value = JSON.parse(localStorage.getItem('inProgress'));
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


    console.log(cart);

    if (object.typePaiement === 'especes') {
      const register = {
        typePaiement : object.typePaiement,
        caissier : '',
        subtotal,
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
        subtotal,
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
        subtotal,
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
      remise
    };

    this.pdfService.generatePdf(this.dataToPdf);
  }


}
