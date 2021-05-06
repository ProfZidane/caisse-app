import { AuthService } from './../services/auth.service';
import { CartOperateService } from './../services/cart-operate.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
Products = [];
Products2 = [];
Products3 = [];
articles = [];
Total;
SelectedC;
existingCart;
countGetDataInSpecificCart = 0;
p = {
  nv1 : true,
  nv2 : false,
  nv3 : false
};
  constructor(private cartService: CartOperateService, private authService: AuthService, private productService: ProductService,
              private route: Router) {

      /*setTimeout( () => {
      this.LoadOnglet();
      }, 500);*/

      /*setInterval( () => {
        this.LoadDataCart();
      }, 800);*/

      /*setInterval( () => {
        this.CalCulTotal();
      }, 500);
      setInterval( () => {
        this.GetCustomerInLoad();
      }, 500);

      setTimeout( () => {
        this.LoadOnglet();
      }, 500);*/
      //this.Reload();
      // this.LoadDataCart();
      ///
      setInterval(() => {
        this.GetCustomerInLoad();
      }, 1000);
      setInterval( () => {
        this.CalCulTotal();
      }, 500);
      // this.CalCulTotal();

      this.LoadProductToCart();

      this.EachOneSecond();

   }

  ngOnInit(): void {
    console.log('Chargement du panier !');
    this.VerifyExistingCart();
    this.LoadOnInit();
  }


  // Verifier les paniers presents !
  VerifyExistingCart() {
    this.existingCart = this.cartService.CountingExistingCart();
    console.log(this.existingCart);
  }


  // charger les données des differents paniers
  LoadProductToCart() {
    this.Products = this.cartService.GetProductToCart1();
    this.Products2 = this.cartService.GetProductToCart2();
    this.Products3 = this.cartService.GetProductToCart3();
  }


  // fonction de rechargement continu
  EachOneSecond() {
    console.log('execution set interval');

    setInterval( () => {
      this.RealTimeLoadProductToCart();
    }, 1000);
  }


  // charger en temps réel les données en fonction des paniers
  RealTimeLoadProductToCart() {
    const inP = JSON.parse(localStorage.getItem('inProgress'));
    // console.log(inP);
    if (inP.in === 1) {
      this.countGetDataInSpecificCart ++;
      if (document.getElementById('home')) {
        document.getElementById('home').classList.add('show');
        document.getElementById('home').classList.add('active');
      }
      if (document.getElementById('cart2')) {
        document.getElementById('cart2').classList.remove('show');
        document.getElementById('cart2').classList.remove('active');
      }
      if (document.getElementById('cart3')) {
        document.getElementById('cart3').classList.remove('show');
        document.getElementById('cart3').classList.remove('active');
      }
      this.p.nv1 = true;
      this.p.nv3 = false;
      this.p.nv2 = false;
      // console.log('#' + this.countGetDataInSpecificCart.toString() + ' vous chargez les datas du panier 1');
      this.Products = this.cartService.GetProductToCart1();
    } else if (inP.in === 2) {
      this.countGetDataInSpecificCart ++;
      if (document.getElementById('home')) {
        document.getElementById('home').classList.remove('show');
        document.getElementById('home').classList.remove('active');
      }
      if (document.getElementById('cart2')) {
        document.getElementById('cart2').classList.add('show');
        document.getElementById('cart2').classList.add('active');
      }
      if (document.getElementById('cart3')) {
        document.getElementById('cart3').classList.remove('show');
        document.getElementById('cart3').classList.remove('active');
      }
      this.p.nv2 = true;
      this.p.nv3 = false;
      this.p.nv1 = false;
      // console.log('#' + this.countGetDataInSpecificCart.toString() + ' vous chargez les datas du panier 2');
      this.Products2 = this.cartService.GetProductToCart2();
    } else if (inP.in === 3) {
      this.countGetDataInSpecificCart ++;
      if (document.getElementById('home')) {
        document.getElementById('home').classList.remove('show');
        document.getElementById('home').classList.remove('active');
      }
      if (document.getElementById('cart2')) {
        document.getElementById('cart2').classList.remove('show');
        document.getElementById('cart2').classList.remove('active');
      }
      if (document.getElementById('cart3')) {
        document.getElementById('cart3').classList.add('show');
        document.getElementById('cart3').classList.add('active');
      }
      this.p.nv3 = true;
      this.p.nv2 = false;
      this.p.nv1 = false;
      // console.log('#' + this.countGetDataInSpecificCart.toString() + ' vous chargez les datas du panier 3');
      this.Products3 = this.cartService.GetProductToCart3();
    }
  }

/*
  LoadDataCart() {
      this.Products = this.cartService.LoadTrueDataToCart();
  }

*/

// Augmentation de la quantité
  Inscrease(id) {
    console.log(id);
    this.cartService.InscreaseQuantity(id);
  }


// Réduction de la quantité
  Descrease(id) {
    this.cartService.DicreaseQuantity(id);
  }


// Suppression de produit
  Clear(id) {
    this.cartService.ClearProduct(id);
  }



  // Récupération du total panier
  CalCulTotal() {
    this.Total = this.cartService.GetTotal();
  }



  // Récupérer le client en cours d'achat
  GetCustomerInLoad() {
    if (this.authService.GetSelectedCustomer() !== null) {
      this.SelectedC = this.authService.GetSelectedCustomer().name;
    }
  }


  // changement d'onglet (de panier)
  ChangeForFirst(value) {
    this.cartService.ChangeOnglet(value);
    if (value === 1) {
      this.p.nv1 = true;
      this.p.nv3 = false;
      this.p.nv2 = false;
    } else if (value === 2) {
      this.p.nv2 = true;
      this.p.nv3 = false;
      this.p.nv1 = false;
    } else if (value === 3) {
      this.p.nv3 = true;
      this.p.nv2 = false;
      this.p.nv1 = false;
    }
  }


  // chargement de donnee au chargement de la page
  LoadOnInit() {
    const in_progress_value = JSON.parse(localStorage.getItem('inProgress'));
    in_progress_value.in = 1;
    localStorage.setItem('inProgress', JSON.stringify(in_progress_value));
    /*setTimeout( () => {
      this.AttributeActiveToLink(indice);
    }, 200);*/
  }

  // creation de panier utilisateur
  CreateOnglet(): void {
    if (this.existingCart) {
        this.cartService.CreatingTab();
        // console.log(JSON.parse(localStorage.getItem('inProgress')));
        const indice = JSON.parse(localStorage.getItem('inProgress'));
        console.log(indice);
        setTimeout( () => {
          console.log('activation');

          this.AttributeActiveToLink(indice);
        }, 500);
        // this.AttributeActiveToLink(indice);
    }
  }


  RemoveOnglet() {
    this.cartService.DesactiveCart();
    const indice = JSON.parse(localStorage.getItem('inProgress'));
    this.AttributeActiveToLink(indice);
  }


  // Attribuer classe après génération
AttributeActiveToLink(indice) {
  const first = document.getElementById('home-tab');
  const second = document.getElementById('cart2-tab');
  const third = document.getElementById('cart3-tab');
  const inP = JSON.parse(localStorage.getItem('inProgress'));
  console.log(indice.in === 2);

  if ((indice.in) === 1) {
    this.p.nv1 = true;
    this.p.nv2 = false;
    this.p.nv3 = false;

    if (first) {
      if (document.getElementById('home')) {
        document.getElementById('home').classList.add('show');
      }
      first.classList.add('active');
      first.setAttribute('aria-selected', 'true');
    }
    if (second) {
      if (document.getElementById('cart2')) {
        document.getElementById('cart2').classList.remove('show');
      }
      second.classList.remove('active');
      second.setAttribute('aria-selected', 'false');
    }
    if (third) {
      if (document.getElementById('cart3')) {
        document.getElementById('cart3').classList.remove('show');
      }
      third.classList.remove('active');
      third.setAttribute('aria-selected', 'false');
    }

  } else if ((indice.in) === 2) {

    this.p.nv1 = false;
    this.p.nv2 = true;
    this.p.nv3 = false;

    if (second) {
      if (document.getElementById('cart2')) {
        document.getElementById('cart2').classList.add('show');
      }
      second.classList.add('active');
      second.setAttribute('aria-selected', 'true');
    }
    if (first) {
      if (document.getElementById('home')) {
        document.getElementById('home').classList.remove('show');
      }
      first.classList.remove('active');
      first.setAttribute('aria-selected', 'false');
    }
    if (third) {
      if (document.getElementById('cart3')) {
        document.getElementById('cart3').classList.remove('show');
      }
      third.classList.remove('active');
      third.setAttribute('aria-selected', 'false');
    }

  } else if ((indice.in) === 3) {
    this.p.nv1 = false;
    this.p.nv2 = false;
    this.p.nv3 = true;

    if (first) {
      if (document.getElementById('home')) {
        document.getElementById('home').classList.remove('show');
      }
      first.classList.remove('active');
      first.setAttribute('aria-selected', 'false');
    }
    if (second) {
      if (document.getElementById('cart2')) {
        document.getElementById('cart2').classList.remove('show');
      }
      second.classList.remove('active');
      second.setAttribute('aria-selected', 'false');
    }
    if (third) {
      if (document.getElementById('cart3')) {
        document.getElementById('cart3').classList.add('show');
      }
      third.classList.add('active');
      third.setAttribute('aria-selected', 'true');
    }

  } else {
    console.log('rien');
  }
}





  LoadOnglet() {
    const countOnglet = JSON.parse(localStorage.getItem('inProgress')).in;
    console.log(countOnglet);
    for (let i = 2; i <= countOnglet; i++) {
      console.log(i);
      const newOnglet = document.createElement('li');
      newOnglet.classList.add('nav-item');
      const n = document.createElement('a');
      n.classList.add('nav-link');
      //n.classList.add('active');
      n.setAttribute('id', 'home-tab');
      n.setAttribute('data-toggle', 'tab');
      n.setAttribute('href', '#home');
      n.setAttribute('role', 'tab');
      n.setAttribute('aria-controls', 'home');
      n.setAttribute('aria-selected', 'true');
      n.setAttribute('data-progress', i.toString());
      const text = document.createTextNode(i.toString());
      n.appendChild(text);
      // add event lister to load data to cart at perfect time
      n.addEventListener('click', () => {
        const a = n.getAttribute('data-progress');
        console.log('jai clicquer sur le ' + a +  ' !');
        this.cartService.ChangeOnglet(Number(a));
      });
      newOnglet.appendChild(n);
      document.getElementById('myTab').insertBefore(newOnglet, document.getElementById('first').lastElementChild.nextSibling);
    }
  }

  goToCheckout() {
    if (localStorage.getItem('customerChoice') !== null) {
      if (Number(this.Total) > 0) {
        localStorage.setItem('total', this.Total.toString());
        // location.href = '/checkout';
        this.route.navigateByUrl('/checkout/new/0');
      } else {
        alert('Votre panier est vide !');
        alert('Veuillez soit switcher sur un autre ou le remplir !');
      }
    } else {
      alert('Veuillez sélectionner un client !');
      this.route.navigateByUrl('/home/(child1:customer;open=true');
    }
  }


  goToCustomer() {
    this.route.navigateByUrl('/home/(child1:customer;open=true');
  }

}
