import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  pdfMake: any;
  constructor() { }

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  generateContent(object) {
    var definition = {
      pageOrientation: 'portrait',
      pageSize: 'A6',
      content : [
        {
          text : 'Accessoires Modes',
          style : 'header',
          alignment: 'center'
        },
        {
          text: 'ABIDJAN, COCODY Riviera',
          style : 'subHeader',
          alignment: 'center'
        },
        {
          text : 'Synaccassci 2 BP 827 CIDEX 03',
          style : 'subHeader',
          alignment: 'center'
        },
        {
          text : '+225 2722597929 / +225 0779137141',
          style : 'subHeader',
          alignment : 'center'
        },
        {
          text : 'Client : ' + object.customer.name + ' / ' + object.customer.telephone,
          style : 'subContent',
          margin : [0, 20, 0, 0],
          alignment: 'center',
          fontSize : 8
        },
        {
          text : 'Vendeur : ' + JSON.parse(localStorage.getItem('caissier')).name,
          style : 'subContent',
          margin : [0, 5, 0, 0],
          alignment: 'center',
          fontSize : 8
        },
        {
          text : 'Le ' + object.date,
          style : 'detail',
          margin : [0, 10, 0, 5],
          alignment: 'center',
        },
        {
          style : 'account',
          margin : [17, 10, 0, 10],
          alignment : 'center',
          table : {
            alignment : 'center',
            body : object.produit,
            border: [false, false, false, false],
          }
        },
        {
          alignment : 'center',
          text : 'Remise : ' + object.remise,
          fontSize : 11,
          margin : [0, 15, 0, 0]
        },
        {
          alignment : 'center',
          text : 'Merci et à bientôt !',
          fontSize : 10,
          margin : [0, 30, 0, 0]
        }
      ],
      styles : {
        header : {
          fontSize : 20,
          bold : true,
          margin : 10,
          color : ''
        },
        subHeader : {
          fontSize : 10,
          bold : false,
          width : 10
        },
        subContent : {
          fontSize : 10,
          bold : false,
          marginTop : 5
        },
        detail : {
          fontSize : 8,
          bold : false
        },
        productStyle : {
          fontSize : 10,
          bold : false,
          color : 'gray',
          width : '20px'
        },
        account : {
        }
      }
    };

    return definition;
  }

  async generatePdf(object) {
    console.log(object);

    await this.loadPdfMaker();

    const sub_p = [
      {
        border : [false, false, false, false],
        text : 'Sous-total',
        alignment : 'center',
        fontSize: 7.5,
        bold: true
      },
      {
        border : [false, false, false, false],
        text : '',
        alignment : 'center',
        fontSize: 7.5,
        bold: true
      },
      {
        border : [false, false, false, false],
        text : 'FCFA',
        alignment : 'center',
        fontSize: 7.5,
        bold: true
      },
      {
        border : [false, false, false, false],
        text : object.sub_total,
        alignment : 'center',
        fontSize: 7.5,
        bold: true
      }
    ];

    object.produit.push(sub_p);
    const p = [
      {
        border : [false, false, false, false],
        text : 'NET A PAYER',
        alignment : 'center',
      },
      {
        border : [false, false, false, false],
        text : '',
        alignment : 'center',
      },
      {
        border : [false, false, false, false],
        text : 'FCFA',
        alignment : 'center',
      },
      {
        border : [false, false, false, false],
        text : object.total,
        alignment : 'center',
      }
    ];

    object.produit.push(p);


    const pe = [
      {
        border : [false, false, false, false],
        text : 'Montant Payé',
        alignment : 'center',
        fontSize: 7.5
      },
      {
        border : [false, false, false, false],
        text : '',
        alignment : 'center',
      },
      {
        border : [false, false, false, false],
        text : 'FCFA',
        alignment : 'center',
        fontSize: 7.5
      },
      {
        border : [false, false, false, false],
        text : object.montant_recu,
        alignment : 'center',
        fontSize: 7.5
      }
    ];

    object.produit.push(pe);


    const pre_p = [
      {
        border : [false, false, false, false],
        text : 'Monnaie Rendue',
        alignment : 'center',
        fontSize: 7.5
      },
      {
        border : [false, false, false, false],
        text : '',
        alignment : 'center',
      },
      {
        border : [false, false, false, false],
        text : 'FCFA',
        alignment : 'center',
        fontSize: 7.5
      },
      {
        border : [false, false, false, false],
        text : object.exchange,
        alignment : 'center',
        fontSize: 7.5
      }
    ];

    object.produit.push(pre_p);


    const def = this.generateContent(object);
    // { content: 'A sample PDF document generated using Angular and PDFMake' };
    try {
      this.pdfMake.createPdf(def).print();
    } catch (error) {
      console.log(error);
    }
  }



}
