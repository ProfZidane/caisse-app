import { AuthService } from './../services/auth.service';
import { CartOperateService } from './../services/cart-operate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
Products = [];
articles = [
  {
    id : 1,
    name : 'Sac à main',
    price : 35000,
    img : 'https://image.freepik.com/free-photo/pink-handbags_1203-7710.jpg'
  },
  {
    id : 2,
    name : 'Montre de luxe',
    price : 55000,
    img : 'https://image.freepik.com/free-photo/elegant-watch-with-silver-golden-chain-isolated_181624-27080.jpg'
  },
  {
    id : 3,
    name : 'Ordinateur Apple',
    price : 10000000,
    img : 'https://image.freepik.com/free-photo/desk-gadgets_181624-23300.jpg'
  },
  {
    id : 4,
    name : 'Tee-shirt',
    price : 5200,
    img : 'https://image.freepik.com/free-psd/simple-black-men-s-tee-mockup_53876-57893.jpg'
  },
  {
    id : 5,
    name : 'Culotte',
    price : 2500,
    img : 'https://image.freepik.com/free-photo/casual-men-short-pants_1203-8186.jpg'
  },
  {
    id : 6,
    name : 'Pantalon',
    price : 3500,
    img : 'https://image.freepik.com/free-photo/jeans_1203-8093.jpg'
  }
];
Total;
SelectedC;
  constructor(private cartService: CartOperateService, private authService: AuthService) {
      setInterval( () => {
        this.Reload();
      }, 500);
      setInterval( () => {
        this.CalCulTotal();
      }, 500);
      setInterval( () => {
        this.GetCustomerInLoad();
      }, 500);

      //this.LoadOnglet();
   }

  ngOnInit(): void {
  }


  Reload() {
    if (this.Products.length > 0) {
      this.Products = [];
      this.LoadDataCart();
    } else {
      this.LoadDataCart();
    }
  }

  LoadDataCart() {
    const p = this.cartService.GetProductToCart();
    p.forEach(element => {
      this.SelectInArticles(element);
    });
  }

  // tslint:disable-next-line:variable-name
  SelectInArticles(other_element) {
    const p = JSON.parse(localStorage.getItem('inProgress'));
    // tslint:disable-next-line:variable-name
    const in_p = p.in;
    this.articles.forEach(elt => {
      if (elt.id === other_element.identify && other_element.progress === in_p) {
        const data = {
          id : elt.id,
          name : elt.name,
          img : elt.img,
          price : elt.price,
          qte : other_element.quantity
        };
        // elt.qte = other_element.quantity;
        this.Products.push(data);
      }
    });
  }


  Inscrease(id) {
    /*this.Products.forEach(elt => {
      if (elt.id === id) {
        elt.qte ++;
      }
    });*/
    this.cartService.InscreaseQuantity(id);
  }

  Descrease(id) {
    this.cartService.DicreaseQuantity(id);
  }

  Clear(id) {
    console.log(id);

    this.cartService.ClearProduct(id);
  }

  CalCulTotal() {
    this.Total = 0;
    this.Products.forEach(element => {
      this.Total += Number(element.price) * Number(element.qte);
    });
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
    for (let i = countOnglet; i > 0; i--) {
      console.log(i);
      const newOnglet = document.createElement('li');
      newOnglet.classList.add('nav-item');
      const n = document.createElement('a');
      n.classList.add('nav-link');
      n.classList.add('active');
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

}
