import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-content',
  templateUrl: './order-content.component.html',
  styleUrls: ['./order-content.component.css']
})
export class OrderContentComponent implements OnInit {
  orders;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  visibility = true;
  loading;
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getAllOrder().subscribe(
      (data) => {
        console.log(data);
        this.orders = data;

        this.dtTrigger.next();
        this.visibility = false;
      }, (err) => {
        console.log(err);
        this.visibility = false;
      }
    );
  }

  goToDetailOrder(id) {
    console.log(id);
    this.router.navigateByUrl('/order/(child3:order-detail/' + id + ';open=true)');
  }

}
