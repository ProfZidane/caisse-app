import { AuthService } from './../services/auth.service';
import { CartOperateService } from './../services/cart-operate.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
Products = [];
articles = [];
Total;
SelectedC;
  constructor(private cartService: CartOperateService, private authService: AuthService, private productService: ProductService) {
      setInterval( () => {
        this.LoadDataCart();
      }, 1000);

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
      this.LoadDataCart();
      setInterval( () => {
        this.CalCulTotal();
      }, 500);
      // this.CalCulTotal();

   }

  ngOnInit(): void {
    // this.LoadOnglet();
    /*this.LoadDataCart();
      this.CalCulTotal();*/

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {

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
    const scc = this.authService.GetSelectedCustomer();
    if (scc !== null) {
      this.SelectedC = scc.name;
    }
    // this.SelectedC = scc.name;
  }

  ChangeForFirst(value) {
    this.cartService.ChangeOnglet(value);
  }

  CreateOnglet() {
    // this.cartService.CreateNewAngled();
    /*let data_progress = JSON.parse(localStorage.getItem('inProgress'));
    let new_data_progress = data_progress.in + 1;
    this.cartService.CreateNewOnglet(new_data_progress);*/
    const lastOnglet = document.getElementById('myTab').lastElementChild;
    // console.log(lastOnglet.classList);
    // tslint:disable-next-line:variable-name
    const child_of_lastOnglet = lastOnglet.firstElementChild as HTMLElement;
    // console.log(child_of_lastOnglet);
    child_of_lastOnglet.classList.remove('active');

    console.log(lastOnglet.textContent);
    // tslint:disable-next-line:variable-name
    const upgrade_number = Number(lastOnglet.textContent) + 1;
    const newOnglet = document.createElement('li');
    newOnglet.classList.add('nav-item');
    const n = document.createElement('a');
    n.classList.add('nav-link');
    n.classList.add('active')
    n.setAttribute('id','home-tab');
    n.setAttribute('data-toggle','tab');
    n.setAttribute('href', '#home');
    n.setAttribute('role', 'tab');
    n.setAttribute('aria-controls', 'home');
    n.setAttribute('aria-selected', 'true');
    n.setAttribute('data-progress', upgrade_number.toString());
    const text = document.createTextNode(upgrade_number.toString());
    n.appendChild(text);
    // add event lister to load data to cart at perfect time
    n.addEventListener('click', () => {
      const a = n.getAttribute('data-progress');
      console.log('jai clicquer sur le ' + a +  ' !');
      this.cartService.ChangeOnglet(Number(a));
    });
    newOnglet.appendChild(n);
    this.cartService.ChangeOnglet(Number(upgrade_number));
    document.getElementById('myTab').insertBefore(newOnglet, document.getElementById('first').lastElementChild.nextSibling);
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
    localStorage.setItem('total', this.Total.toString());
    location.href = '/checkout';
  }

}
