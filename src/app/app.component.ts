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
      const tab = [];
      localStorage.setItem('cart', JSON.stringify(tab));
    }
    throw new Error('Method not implemented.');
  }

}

