import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartOperateService } from '../services/cart-operate.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ProductService } from '../services/product.service';
import { $ } from 'protractor';

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
Total;
SubTotal;
SumCustomer;
tempo = '';
exchange;
customer;
typePayement;
visibility = {
  option: false,
  typeReduction : '',
  valueReduction : '',
  sommeDelivery : ''
};
reduction = {
  state : false,
  option: '',
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
response_checkout = {
  success : false,
  error : false
};
error_in_money;
mode;
numOrder;
productToCart;
stateErrorInReductionSp = false;
reductionToSpecificProduct = []; // variable does not use
totalValueToReductionSp;
  constructor(private cartService: CartOperateService, private router: Router, private route: ActivatedRoute,
              private productService: ProductService) {
    this.typePayement = 'especes';
   }

  ngOnInit(): void {
    /*this.Total = Number(localStorage.getItem('total'));
    console.log(this.Total);*/
    this.route.paramMap.subscribe(
      (params => {
        this.mode = params.get('mode');
      })
    );
    this.route.paramMap.subscribe(
      (params => {
        this.numOrder = params.get('num');
      })
    );
    console.log(this.numOrder);
    this.getCustomer();
    this.getTotal();
    this.getProductToCart();
  }

  ngAfterViewInit() {
    this.TouchCalculator();
    this.KeyboardTouch();
  }



  // Récupération des données numériques du pavé écran
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

            const newVal = this.tempo.slice(0, -1);
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


  // Evenement de capture donnée des touches numériques
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

  // Récupérer client en cours
  getCustomer() {
    this.customer = JSON.parse(localStorage.getItem('customerChoice'));
  }


  // Récupérer total en cours
  getTotal() {
    this.Total = Number(localStorage.getItem('total'));
    this.SubTotal = this.Total;
  }


  // récupérer les produits du panier en cours
  getProductToCart() {
    const cartInProgress = JSON.parse(localStorage.getItem('inProgress')).in;
    this.productToCart = this.productService.GetProductInCart(cartInProgress);
    console.log(this.productToCart);
  }


  // Mettre à jour le mode de paiement (sélection)
  setTypePayement(value) {
    console.log(value);
    this.typePayement = value;
  }


  // Validation de la commande option cache
  checkout() {
    this.error_in_money = false;
    // Verification de la somme donnée par le client
    if (Number(this.SumCustomer) >= Number(this.Total)) {
      this.success = false;
      const confirm = window.confirm('Voulez-vous vraiment confirmer la commande ?');
      console.log(confirm);

      if (confirm === true) {
        let data = {};
        // format de donnée pour commander
        if (this.reductionToSpecificProduct.length === 0) {
           if (this.reduction.type === 'percent') {
            data = {
              typePaiement : this.typePayement,
              mode : this.mode,
              numOrder : this.numOrder,
              exchange : this.exchange,
              subTotal: Number(this.SubTotal),
              total : this.Total,
              montant_recu: this.SumCustomer,
              livraison : {
                state : this.delivery.state,
                price : this.delivery.value,
                adresse : this.delivery.adresse
              },
              reduction : {
                state : this.reduction.state,
                valeur :   (Number(this.reduction.value) * Number(this.Total)) / 100,
                type : this.reduction.type
              }
            };
           } else {
            data = {
              typePaiement : this.typePayement,
              mode : this.mode,
              numOrder : this.numOrder,
              exchange : this.exchange,
              subTotal: Number(this.SubTotal),
              total : this.Total,
              montant_recu: this.SumCustomer,
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
           }
        } else {
           data = {
            typePaiement : this.typePayement,
            mode : this.mode,
            numOrder : this.numOrder,
            exchange : this.exchange,
            subTotal: Number(this.SubTotal),
            total : this.Total,
            montant_recu: this.SumCustomer,
            livraison : {
              state : this.delivery.state,
              price : this.delivery.value,
              adresse : this.delivery.adresse
            },
            reduction : {
              state : true,
              valeur : this.totalValueToReductionSp,
              type : 'byProduct',
              products: this.reductionToSpecificProduct
            }
          };
        }

        console.log(data);

        this.cartService.Checkout(data).subscribe(
          (success) => {
            console.log(success);
            this.loadingControl();
            this.cartService.starterGenerateTicket();
            this.response_checkout.success = true;
            this.response_checkout.error = false;
            this.successPayment();
            this.totalValueToReductionSp = 0;
            this.reductionToSpecificProduct = [];
          }, (err) => {
            console.log(err);
            this.loadingControl();
            this.response_checkout.success = false;
            this.response_checkout.error = true;
          }
        );
      } else {
        this.success = true;
      }
    } else {
      this.error_in_money = true;

      setTimeout( () => {
        this.error_in_money = false;
      }, 5000);
    }
  }


  // Validation du paiement par échelonnement
  checkoutEchelonne() {
    this.error_in_money = false;
    // Verification de la somme donnée par le client
    this.success = false;
    const confirm = window.confirm('Voulez-vous vraiment confirmer la commande ?');
    console.log(confirm);

    if (confirm === true) {
        let data = {};
        // format de donnée pour commander
        if (this.reductionToSpecificProduct.length === 0) {
          if (this.reduction.type === 'percent') {
            data = {
              typePaiement : this.typePayement,
              mode : this.mode,
              numOrder : this.numOrder,
              exchange : this.exchange,
              subTotal: Number(this.SubTotal),
              total : this.Total,
              montant_recu: this.SumCustomer,
              livraison : {
                state : this.delivery.state,
                price : this.delivery.value,
                adresse : this.delivery.adresse
              },
              reduction : {
                state : this.reduction.state,
                valeur : (Number(this.reduction.value) * Number(this.Total)) / 100,
                type : this.reduction.type
              }
            };
          } else {
            data = {
              typePaiement : this.typePayement,
              mode : this.mode,
              numOrder : this.numOrder,
              exchange : this.exchange,
              subTotal: Number(this.SubTotal),
              total : this.Total,
              montant_recu: this.SumCustomer,
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
          }
        } else {
          data = {
            typePaiement : this.typePayement,
            mode : this.mode,
            numOrder : this.numOrder,
            exchange : this.exchange,
            subTotal: Number(this.SubTotal),
            total : this.Total,
            montant_recu: this.SumCustomer,
            livraison : {
              state : this.delivery.state,
              price : this.delivery.value,
              adresse : this.delivery.adresse
            },
            reduction : {
              state : true,
              valeur : this.totalValueToReductionSp,
              type : 'byProduct',
              products: this.reductionToSpecificProduct
            }
          };
        }

        console.log(data);
        this.cartService.Checkout(data).subscribe(
          (success) => {
            console.log(success);
            this.loadingControl();
            this.cartService.GenerateFactureEchelonne();
            this.response_checkout.success = true;
            this.response_checkout.error = false;
            this.successPayment();
          }, (err) => {
            console.log(err);
            this.loadingControl();
            this.response_checkout.success = false;
            this.response_checkout.error = true;
          }
        );
      } else {
        this.success = true;
      }

  }

  checkoutCreditCard() {
    this.success = false;
    this.error_in_money = false;
    //
    console.log(this.typePayement);
    if (this.typePayement !== '') {
      const confirm = window.confirm('Voulez-vous vraiment confirmer la commande ?');
      if (confirm === true) {
        let data = {};
        if (this.reductionToSpecificProduct.length === 0) {
          if (this.reduction.type === 'percent') {
            data = {
              typePaiement : this.typePayement,
              mode : this.mode,
              numOrder : this.numOrder,
              check : this.check,
              subTotal: Number(this.SubTotal),
              total : this.Total,
              montant_recu: this.Total,
              livraison : {
                state : this.delivery.state,
                price : this.delivery.value,
                adresse : this.delivery.adresse
              },
              reduction : {
                state : this.reduction.state,
                valeur : (Number(this.reduction.value) * Number(this.Total)) / 100,
                type : this.reduction.type
              }
            };
          } else {
            data = {
              typePaiement : this.typePayement,
              mode : this.mode,
              numOrder : this.numOrder,
              check : this.check,
              subTotal: Number(this.SubTotal),
              total : this.Total,
              montant_recu: this.Total,
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
          }
        } else {
          data = {
            typePaiement : this.typePayement,
            mode : this.mode,
            numOrder : this.numOrder,
            check : this.check,
            subTotal: Number(this.SubTotal),
            total : this.Total,
            montant_recu: this.Total,
            livraison : {
              state : this.delivery.state,
              price : this.delivery.value,
              adresse : this.delivery.adresse
            },
            reduction : {
              state : true,
              valeur : this.totalValueToReductionSp,
              type : 'byProduct',
              products: this.reductionToSpecificProduct
            }
          };
        }

        this.cartService.Checkout(data).subscribe(
          (success) => {
            console.log(success);
            this.loadingControl();
            this.cartService.starterGenerateTicket();
            this.response_checkout.success = true;
            this.response_checkout.error = false;
            this.successPayment();
          }, (err) => {
            console.log(err);
            this.loadingControl();
            this.response_checkout.success = false;
            this.response_checkout.error = true;
          }
        );
      }
    } else {
      alert('Veuillez renseigner votre option de paiement !');
      this.success = true;
    }

  }

  checkoutMobileMoney() {
    this.success = false;
    this.error_in_money = false;
    if (this.mobileMoney.num !== '' && this.mobileMoney.network !== '') {

      const confirm = window.confirm('Voulez-vous vraiment confirmer la commande ?');
      if (confirm === true) {
        let data = {};
        if (this.reductionToSpecificProduct.length === 0) {
          if (this.reduction.type === 'percent') {
            data = {
              typePaiement : this.typePayement,
              mode : this.mode,
              numOrder : this.numOrder,
              mobile : this.mobileMoney,
              subTotal: Number(this.SubTotal),
              total : this.Total,
              montant_recu: this.Total,
              livraison : {
                state : this.delivery.state,
                price : this.delivery.value,
                adresse : this.delivery.adresse
              },
              reduction : {
                state : this.reduction.state,
                valeur : (Number(this.reduction.value) * Number(this.Total)) / 100,
                type : this.reduction.type
              }
            };
          } else {
            data = {
              typePaiement : this.typePayement,
              mode : this.mode,
              numOrder : this.numOrder,
              mobile : this.mobileMoney,
              subTotal: Number(this.SubTotal),
              total : this.Total,
              montant_recu: this.Total,
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
          }
        } else {
          data = {
            typePaiement : this.typePayement,
            mode : this.mode,
            numOrder : this.numOrder,
            mobile : this.mobileMoney,
            subTotal: Number(this.SubTotal),
            total : this.Total,
            montant_recu: this.Total,
            livraison : {
              state : this.delivery.state,
              price : this.delivery.value,
              adresse : this.delivery.adresse
            },
            reduction : {
              state : true,
              valeur : this.totalValueToReductionSp,
              type : 'byProduct',
              products: this.reductionToSpecificProduct
            }
          };
        }
        console.log(data);
        this.cartService.Checkout(data).subscribe(
          (success) => {
            console.log(success);
            this.loadingControl();
            this.cartService.starterGenerateTicket();
            this.response_checkout.success = true;
            this.response_checkout.error = false;
            this.successPayment();
          }, (err) => {
            console.log(err);
            this.loadingControl();
            this.response_checkout.success = false;
            this.response_checkout.error = true;
          }
        );
      } else {
        this.success = true;
      }

    } else {

      alert('Veuillez à ce que le numéro de téléphone du client et le réseau de transaction soit spécifier !');
      this.success = true;
    }

  }

  applyReduction() {
    this.visibility.typeReduction = 'true';
    this.visibility.valueReduction = 'true';
  }

  requestReduction() {
    if (this.visibility.option === false) {
      this.visibility.option = true;
    } else {
      this.visibility.option = false;
      this.visibility.typeReduction = 'false';
      this.visibility.valueReduction = 'false';
    }
  }

  setReductionToProduct(id, price) {

    const value = document.getElementById(id);
    const value2 = document.getElementById('pourc-' + id);
    const spinner = document.getElementById('loader-' + id);
    spinner.style.display = 'block';


    if (value.value !== '' && value2.value === '') {

      const data = {
        id,
        type: 'fixed',
        value: Number(value.value),
      };

      this.reductionToSpecificProduct.push(data);

      console.log(this.reductionToSpecificProduct);


    } else if (value.value === '' && value2.value !== '') {

      const data = {
        id,
        type: 'percent',
        value: (Number(price) * Number(value2.value)) / 100
      };

      this.reductionToSpecificProduct.push(data);

      console.log(this.reductionToSpecificProduct);


    } else if (value.value !== '' && value2.value !== '') {

      const data = {
        id,
        type: 'fixed',
        value: Number(value.value) + ((Number(price) * Number(value2.value)) / 100)
      };

      this.reductionToSpecificProduct.push(data);

      console.log(this.reductionToSpecificProduct);


    } else {
      console.log('nothing');
      this.stateErrorInReductionSp = true;
    }

    setTimeout( () => {
      spinner.style.display = 'none';
      value.value = null;
      value2.value = null;
    }, 500);

    setTimeout( () => {
      this.stateErrorInReductionSp = false;
    }, 1500);

  }

  applyReductionToTotal() {
    let totalPriceReduce = 0;
    this.reductionToSpecificProduct.forEach(element => {
      totalPriceReduce += element.value;
    });
    console.log(totalPriceReduce);
    this.totalValueToReductionSp = totalPriceReduce;
    this.Total -= totalPriceReduce;
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

  setType(event) {
    console.log(event.target.value);
    if (event.target.value === 'global') {
      this.applyReduction();
    } else {
      this.visibility.typeReduction = 'false';
      this.visibility.valueReduction = 'false';
    }
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



  // Animation de chargement
  loadingControl() {
    setTimeout( () => {
      this.success = true;
    }, 1000);
  }



  // Opération de fin de validation
  successPayment() {
    // localStorage.removeItem('')
    const indice = JSON.parse(localStorage.getItem('inProgress'));
    if (indice.in === 1) {
      setTimeout( () => {
        localStorage.setItem('cart-1', '[]');
        localStorage.removeItem('total');
        // localStorage.setItem('customerChoice', JSON.stringify({}));
        localStorage.removeItem('customerChoice');
        this.router.navigateByUrl('/home');
      }, 2000);
    } else if (indice.in === 2) {
      setTimeout( () => {
        localStorage.setItem('cart-2', '[]');
        localStorage.removeItem('total');
        // localStorage.setItem('customerChoice', JSON.stringify({}));
        localStorage.removeItem('customerChoice');
        this.router.navigateByUrl('/home');
      }, 2000);
    } else if (indice.in === 3) {
      setTimeout( () => {
        localStorage.setItem('cart-3', '[]');
        localStorage.removeItem('total');
        // localStorage.setItem('customerChoice', JSON.stringify({}));
        localStorage.removeItem('customerChoice');
        this.router.navigateByUrl('/home');
      }, 2000);
    }
  }
}
