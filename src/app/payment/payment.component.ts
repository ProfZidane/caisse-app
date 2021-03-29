import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
Total;
SumCustomer;
tempo = '';
exchange;
customer;
typePayement;
visibility = {
  typeReduction : '',
  valueReduction : '',
  sommeDelivery : ''
};
reduction = {
  type : '',
  value : 0,
};
delivery = {
  value : 0,
  adresse : ''
};

  constructor() {
    this.typePayement = 'cash';
   }

  ngOnInit(): void {
    /*this.Total = Number(localStorage.getItem('total'));
    console.log(this.Total);*/
    this.getCustomer();
    this.getTotal();
  }

  ngAfterViewInit() {
    this.TouchCalculator();
    this.KeyboardTouch();
  }


  TouchCalculator() {
    const touch = document.querySelectorAll('.cal');
    touch.forEach(element => {
      element.addEventListener('click', () => {
        const value = element.getAttribute('data-id');
        //console.log(value);
        if (value === 'eff') {
          //console.log(this.SumCustomer);

          if (this.SumCustomer === '0' || this.SumCustomer === undefined || this.SumCustomer === '') {
            this.SumCustomer = '0';
            alert('ATTENTION : Opération arithmétique non correcte ! ');



          } else {

            const newVal = this.tempo.slice(0,-1);
            this.tempo = newVal;
            this.SumCustomer = newVal


            this.exchange = Number(this.Total) - Number(this.SumCustomer);
            //console.log(this.exchange);

            this.exchange = this.exchange.toString();
          }
          //console.log(newVal);


        } else {

          this.tempo += value.toString();
          this.SumCustomer = this.tempo;
          this.exchange = Number(this.Total) - Number(this.SumCustomer);
          //console.log(this.exchange);

          this.exchange = this.exchange.toString();

        }

      });
    });
  }

  KeyboardTouch() {
    document.addEventListener('keydown', (event) => {
      const nomOfTouch = event.key;
      //alert(nomOfTouch);
      if (nomOfTouch === 'Backspace') {
        //console.log(this.SumCustomer);

        if (this.SumCustomer === '0' || this.SumCustomer === undefined || this.SumCustomer === '') {
          this.SumCustomer = '0';
          alert('ATTENTION : Opération arithmétique non correcte ! ');

        } else {

          const newVal = this.tempo.slice(0,-1);
          this.tempo = newVal;
          this.SumCustomer = newVal
          this.exchange = Number(this.Total) - Number(this.SumCustomer);
          //console.log(this.exchange);

          this.exchange = this.exchange.toString();
        }
        //console.log(newVal);

      } else if (nomOfTouch === '1' || nomOfTouch === '2' || nomOfTouch === '3' || nomOfTouch === '4' || nomOfTouch === '5' ||
                  nomOfTouch === '6' || nomOfTouch === '7' || nomOfTouch === '8' || nomOfTouch === '9' || nomOfTouch === '0') {

        this.tempo += nomOfTouch;
        this.SumCustomer = this.tempo;
        this.exchange = Number(this.Total) - Number(this.SumCustomer);
        //console.log(this.exchange);

        this.exchange = this.exchange.toString();

      }

    });
  }

  getCustomer() {
    this.customer = JSON.parse(localStorage.getItem('customerChoice'));
  }

  getTotal() {
    this.Total = Number(localStorage.getItem('total'));
  }

  setTypePayement(value) {
    console.log(value);
    this.typePayement = value;
  }


  checkout() {
    console.log(this.typePayement);

    console.log(this.SumCustomer);
    console.log(this.exchange);
    // format de donnée pour commander
    let data = {
      typePaiement : this.typePayement,
      exchange : this.exchange,
      total : this.Total,
      livraison : [

      ]

    };
  }

  applyReduction() {
    this.visibility.typeReduction = 'true';
    this.visibility.valueReduction = 'true';
  }

  setSumDelivery() {
    this.visibility.sommeDelivery = 'true';
    const newValue = prompt('Entrez la somme : ');
    const placeValue = prompt('Entrer l\'adresse de la livraison');
    this.delivery.value = Number(newValue);
    this.Total += this.delivery.value;
    this.delivery.adresse = placeValue;
  }

  setValueReduction(event) {
    console.log('jai changé' + event.target.value);
    const newValue = prompt('Entrez la valeur de la réduction : ');
    console.log(newValue);
    if (event.target.value === 'percent') {
      // this.Total = (this.Total * Number(newValue)) / 100;
      const reduc = (this.Total * Number(newValue)) / 100;
      this.Total = this.Total - reduc;
    } else if (event.target.value === 'fixed') {
      this.Total = this.Total - Number(newValue);
    }
    this.reduction.value = Number(newValue);

  }

}
