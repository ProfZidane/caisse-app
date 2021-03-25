import { CartOperateService } from './../services/cart-operate.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(private cartService: CartOperateService) { }

  ngOnInit(): void {
  }

  SelectProduct(id) {
    console.log(id);
    this.cartService.InsertToLocalCart(id);
  }

}