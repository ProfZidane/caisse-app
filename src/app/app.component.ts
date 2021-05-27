import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadingFinish = true;
  title = 'caissapp';

  ngOnInit(): void {
    /*setInterval(() => {
      this.loadingFinish = false;
    }, 2000);*/
    if (localStorage.getItem('cart') === null) {
      const tab = [
        {
          1 : true,
          2 : false,
          3 : false
        }
      ];
      localStorage.setItem('cart', JSON.stringify(tab));
      if (localStorage.getItem('cart-1') === null) {
        localStorage.setItem('cart-1', JSON.stringify([]));
      }
      if (localStorage.getItem('cart-2') === null) {
        localStorage.setItem('cart-2', JSON.stringify([]));
      }
      if (localStorage.getItem('cart-3') === null) {
        localStorage.setItem('cart-3', JSON.stringify([]));
      }
    }
<<<<<<< HEAD
    
    if (localStorage.getItem('inProgress') === null) {
      const inProgress = {
        in : 1
      };
      localStorage.setItem('inProgress', JSON.stringify(inProgress));
=======
    if (localStorage.getItem('inProgress') === null) {
      const inProgress = {
        in : 1
      }
      localStorage.setItem('inProgress', JSON.stringify(inProgress));

>>>>>>> a1430a3ca3f34a96b22a6d3003bbc8f326157d94
    }
    // throw new Error('Method not implemented.');
  }

}

