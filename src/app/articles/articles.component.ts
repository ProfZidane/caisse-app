import { CartOperateService } from './../services/cart-operate.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
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
search;
articlesBases;
  constructor(private cartService: CartOperateService, private productService: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.productService.GetProducts().subscribe(
      (data) => {
        this.articles = data;
        this.articlesBases = data;
      }, (err) => {
        // console.log(err);
      }
    );
  }

  // ajouter au panier
  SelectProduct(object) {
    console.log(object);
    this.cartService.InsertToLocalCart(object);
  }

  // creation de liste contenant le mot chercher
  FilterString(array, text) {
    const filteredCart = array.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
    // console.log(filteredCart);
    return filteredCart;

  }


  // fonction generale de recherche integrant la creation de liste du mot cle
  OnResearch(event) {
    // console.log(event.target.value);
    if (event === '') {
      this.articles = this.articlesBases;
    } else {
      this.articles = this.FilterString(this.articlesBases, event.target.value);
    }
  }

  goToScanner() {
    this.route.navigateByUrl('/home/(child1:scanner;open=true');
  }

}
