import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartOperateService } from './cart-operate.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
getproductURL = 'http://192.168.1.120:8000/api/caisse/getAllProducts';
getProductByIdURL = 'http://192.168.1.120:8000/api/caisse/getProduct/';
Articles;
Products = [];
  constructor(private http: HttpClient, private cartService: CartOperateService) { }


  GetProducts(): Observable<any> {
    return this.http.get(this.getproductURL);
  }

  GetProductBySlug(slug): Observable<any> {
    return this.http.get(this.getProductByIdURL + slug);
  }


  /*LoadDataCart(arrayToSelect) {
    const p = this.cartService.GetProductToCart();
    p.forEach(element => {
       this.GetProductsToCart(element,   arrayToSelect);
    });

  }

  GetProductsToCart(other_elt, arrayToSelect) {
    const p = JSON.parse(localStorage.getItem('inProgress'));
    const in_p = p.in;

    this.GetProducts().subscribe(
      (data) => {
        arrayToSelect = data;
        //console.log(this.Articles);

        arrayToSelect.forEach(element => {
          if (element.id === other_elt.identify && other_elt.progress === in_p) {
            console.log('jai eu un produit');

            const data = {
              id : element.id,
              name : element.title,
              img : element.photo,
              price : element.price,
              qte : other_elt.quantity
            };
            //console.log(data);

            // elt.qte = other_element.quantity;
            this.Products.push(data);
           }
        });


      }, (err) => {
        console.log(err);
      }
    );
    return this.Products;
    //console.log(arrayToSelect);

  }*/
}
