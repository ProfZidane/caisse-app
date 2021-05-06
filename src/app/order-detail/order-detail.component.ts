import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CartOperateService } from '../services/cart-operate.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
id;
orderDetail;
dtTrigger: Subject<any> = new Subject<any>();
dtOptions: any = {};
visibility = true;
cartFictious = [];
clientFictious;
totalFictious;
  constructor(private orderService: OrderService, private route: ActivatedRoute, private cartService: CartOperateService,
              private router: Router, private s: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params => {
        this.id = params.get('id');
      })
    );
    this.getDetail(this.id);
  }

  getDetail(id) {
    this.orderService.getOrderDetail(id).subscribe(
      (data) => {
        console.log(data);
        this.orderDetail = data;
        this.dtTrigger.next();
        this.visibility = false;
      }, (err) => {
        console.log(err);
        this.visibility = false;
      }
    );
  }

  AssingOrderToCart() {
    const numCartEmpty = this.cartService.VerifyActiveCart();
    console.log(numCartEmpty);

    // Récupérer le client en cours
    this.clientFictious = this.orderDetail.client;
    localStorage.setItem('customerChoice', JSON.stringify(this.clientFictious));


    // Récupérer le total prix
    this.totalFictious = this.orderDetail.order.total_amount;
    localStorage.setItem('total', this.totalFictious.toString());


    // Récupérer les produits commandés
    if (numCartEmpty) {
      this.orderDetail.carts.forEach(element => {
        const data = {
          identify : element.article.id,
          name : element.article.title,
          img : element.article.photo,
          price : element.article.price,
          slug : element.article.slug,
          quantity : element.cart.quantity,
          stock : element.article.stock,
          amout : element.cart.amount,
          progress : Number(numCartEmpty)
        };
        this.cartFictious.push(data);
      });

      console.log(this.cartFictious);

      localStorage.setItem('inProgress', JSON.stringify({ "in" : Number(numCartEmpty)}));

      localStorage.setItem('cart-' + numCartEmpty.toString(), JSON.stringify(this.cartFictious));

      this.router.navigateByUrl('/checkout/old/' + this.orderDetail.order.order_number);

    } else {

      console.log('Aucun panier n\'est disponible !');

      this.s.open('Aucun panier disponible !', 'OK');
    }

  }

}
