import { Component, OnInit } from '@angular/core';
import { CartOperateService } from '../services/cart-operate.service';

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
  state : false,
  type : '',
  value : 0,
};
delivery = {
  state : false,
  value : 0,
  adresse : ''
};
check = {
  state : false,
  numAccount : '',
};
creditCard = {
  state : false
};

mobileMoney = {
  network : '',
  num : ''
};
success;
  constructor(private cartService: CartOperateService) {
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


            this.exchange = Number(this.SumCustomer) - Number(this.Total);
            //console.log(this.exchange);

            this.exchange = this.exchange.toString();
          }
          //console.log(newVal);


        } else {

          this.tempo += value.toString();
          this.SumCustomer = this.tempo;
          this.exchange = Number(this.SumCustomer) - Number(this.Total);
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
          this.exchange = Number(this.SumCustomer) - Number(this.Total);
          //console.log(this.exchange);

          this.exchange = this.exchange.toString();
        }
        //console.log(newVal);

      } else if (nomOfTouch === '1' || nomOfTouch === '2' || nomOfTouch === '3' || nomOfTouch === '4' || nomOfTouch === '5' ||
                  nomOfTouch === '6' || nomOfTouch === '7' || nomOfTouch === '8' || nomOfTouch === '9' || nomOfTouch === '0') {

        this.tempo += nomOfTouch;
        this.SumCustomer = this.tempo;
        this.exchange = Number(this.SumCustomer) - Number(this.Total);
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
    this.success = false;
    const confirm = window.confirm('Voulez-vous vraiment confirmer la commande ?');
    console.log(confirm);

    if (confirm === true) {
      // console.log(this.typePayement);

      // console.log(this.SumCustomer);
      // console.log(this.exchange);
      // format de donnée pour commander
      let data = {
        typePaiement : this.typePayement,
        exchange : this.exchange,
        total : this.Total,
        livraison : {
          state : this.delivery.state,
          price : this.delivery.value,
          adresse : this.delivery.adresse
        },
        reduction : {
          state : this.reduction.state,
          valeur : this.reduction.value,
          type : this.reduction.type
        }
      };
      this.cartService.Checkout(data);
    }
    this.loadingControl();
  }

  checkoutCreditCard() {
    this.success = false;
    const confirm = window.confirm('Voulez-vous vraiment confirmer la commande ?');
    if (confirm === true) {
      let data = {
        typePaiement : this.typePayement,
        check : this.check,
        total : this.Total,
        livraison : {
          state : this.delivery.state,
          price : this.delivery.value,
          adresse : this.delivery.adresse
        },
        reduction : {
          state : this.reduction.state,
          valeur : this.reduction.value,
          type : this.reduction.type
        }
      };

      this.cartService.Checkout(data);
    }
    this.loadingControl();
  }

  checkoutMobileMoney() {
    this.success = false;
    const confirm = window.confirm('Voulez-vous vraiment confirmer la commande ?');
    if (confirm === true) {
      let data = {
        typePaiement : this.typePayement,
        mobile : this.mobileMoney,
        total : this.Total,
        livraison : {
          state : this.delivery.state,
          price : this.delivery.value,
          adresse : this.delivery.adresse
        },
        reduction : {
          state : this.reduction.state,
          valeur : this.reduction.value,
          type : this.reduction.type
        }
      };
      // console.log(data);
      this.cartService.Checkout(data);
    }
    this.loadingControl();
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
    this.exchange = Number(this.SumCustomer) - Number(this.Total);
    this.delivery.adresse = placeValue;
    this.delivery.state = true;
  }

  setValueReduction(event) {
    console.log('jai changé' + event.target.value);
    const newValue = prompt('Entrez la valeur de la réduction : ');
    console.log(newValue);
    if (event.target.value === 'percent') {
      // this.Total = (this.Total * Number(newValue)) / 100;
      const reduc = (this.Total * Number(newValue)) / 100;
      this.Total = this.Total - reduc;
      this.exchange = Number(this.SumCustomer) - Number(this.Total);
    } else if (event.target.value === 'fixed') {
      this.Total = this.Total - Number(newValue);
      this.exchange = Number(this.SumCustomer) - Number(this.Total);
    }
    this.reduction.value = Number(newValue);
    this.reduction.state = true;

  }

  CardOrCheque(event) {
    console.log(event.target.value);
    if (event.target.value === 'carte') {
      this.typePayement = 'carte';
      this.creditCard.state = true;
      this.check.state = false;
    } else if (event.target.value === 'cheque') {
      this.typePayement = 'cheque';
      this.creditCard.state = false;
      this.check.state = true;
      const numAccount = prompt('Veuillez entrez le numéro du compte : ');
      this.check.numAccount = numAccount;
    }
  }

  loadingControl() {
    setTimeout( () => {
      this.success = true;
    }, 1000);
  }

}
