import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartOperateService } from '../services/cart-operate.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
code = '';
articles;
warning_message = false;
started_message = false;
state = false;
  constructor(private productService: ProductService, private cartService: CartOperateService) { }

  ngOnInit(): void {
    document.getElementById('scannerInput').focus();
    this.productService.GetProducts().subscribe(
      (data) => {
        this.articles = data;
        console.log(this.articles);
        this.started_message = true;
      }, (err) => {
        // console.log(err);
      }
    );
  }

  // Fonction de récupération du code au changement
  loadCode(event) {
    console.log(event.target.value);
    this.getProductByCode(event.target.value);
    this.code = '';
    this.warning_message = false;
  }

  // Réinitialisation du input barcode
  reloadInput() {
    this.code = '';
    document.getElementById('scannerInput').focus();
  }


  // Recherche de produit par code barre
  getProductByCode(code) {
    this.state = false;
    console.log("code produit : " + code);
    
    let isFind =  0;
    if (this.articles !== null) {
      this.articles.forEach(element => {
        if (element.code_barre === code) {
          console.log("produit trouvé !");
          
          this.cartService.InsertToLocalCart(element);
        } else {
          // console.log("produit introuvable !");
          
          isFind ++;
//          this.warning_message = true;
        }
      });
    }

    console.log(isFind);

    if (isFind > 0) {
      console.log('produit introuvable');
      // alert('Produit introuvable !');
      this.warning_message = true;
      this.state = true;

      setTimeout(() => {
        this.state = false;
      }, 1500);
    }
  }
}
