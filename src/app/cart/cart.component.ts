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

      setInterval( () => {
        this.RealTimeLoadProductToCart();
      }, 1000);

   }

  ngOnInit(): void {
    // this.LoadOnglet();
    /*this.LoadDataCart();
      this.CalCulTotal();*/
      this.VerifyExistingCart();



  }


  // Verifier les paniers presents !
  VerifyExistingCart() {
    console.log('chargement ...');

    this.existingCart = this.cartService.CountingExistingCart();
    console.log(this.existingCart);
  }


  // charger les données des differents paniers
  LoadProductToCart() {
    this.Products = this.cartService.GetProductToCart1();
    this.Products2 = this.cartService.GetProductToCart2();
    this.Products3 = this.cartService.GetProductToCart3();
  }


  // charger en temps réel les données en fonction des paniers
  RealTimeLoadProductToCart() {
    const inP = JSON.parse(localStorage.getItem('inProgress'));
    // console.log(inP);
    if (inP.in === 1) {
      this.countGetDataInSpecificCart ++;
      //  console.log('#' + this.countGetDataInSpecificCart.toString() + ' vous chargez les datas du panier 1');
      this.Products = this.cartService.GetProductToCart1();
    } else if (inP === 2) {
      //  console.log('#' + this.countGetDataInSpecificCart.toString() + ' vous chargez les datas du panier 1');
      this.Products2 = this.cartService.GetProductToCart2();
    } else if (inP === 3) {
      //  console.log('#' + this.countGetDataInSpecificCart.toString() + ' vous chargez les datas du panier 1');
      this.Products3 = this.cartService.GetProductToCart3();
    }
    /*if (this.existingCart['1']) {
      this.Products = this.cartService.GetProductToCart1();
    } else if (this.existingCart['2']) {
      this.Products = this.cartService.GetProductToCart2();
    } else if (this.existingCart['3']) {
      this.Products = this.cartService.GetProductToCart3();
    }*/
  }


  LoadDataCart() {
      /*this.Products = this.cartService.GetProductToCart();
      console.log(this.Products);*/

      /*const tableauProduit = [];
      const pp = this.cartService.GetProductToCart();
      const inP = JSON.parse(localStorage.getItem('inProgress'));
      pp.forEach(elt => {
        if (elt.progress === inP.in) {
          tableauProduit.push(elt);
        }
      });

      console.log(tableauProduit);*/

      this.Products = this.cartService.LoadTrueDataToCart();

  }






  Inscrease(id) {
    console.log(id);

    this.cartService.InscreaseQuantity(id);
  }

  Descrease(id) {
    this.cartService.DicreaseQuantity(id);
  }

  Clear(id) {
    //console.log(id);

    this.cartService.ClearProduct(id);
    // this.CalCulTotal();
  }

  CalCulTotal() {
    this.Total = this.cartService.GetTotal();

  }

  GetCustomerInLoad() {
    /*const scc = this.authService.GetSelectedCustomer();
    if (scc !== null) {
      this.SelectedC = scc.name;
    }*/
    if (this.authService.GetSelectedCustomer() !== null) {
      this.SelectedC = this.authService.GetSelectedCustomer().name;
    }
    // this.SelectedC = scc.name;
  }

  // changement d'onglet (de panier)
  ChangeForFirst(value) {
    this.cartService.ChangeOnglet(value);
  }

  // creation de panier utilisateur
  CreateOnglet(): void {
    if (this.existingCart) {
        this.cartService.CreatingTab();
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
      localStorage.setItem('total', this.Total.toString());
      // location.href = '/checkout';
      this.route.navigateByUrl('/checkout');
    } else {
      alert('Veuillez sélectionner un client !');
      this.route.navigateByUrl('/home/(child1:customer;open=true');
    }
  }


  goToCustomer() {
    this.route.navigateByUrl('/home/(child1:customer;open=true');
  }

}
