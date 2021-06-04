import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Pdf2Service {

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

  generateEchelonneContent(object) {
    var definition = {
      pageOrientation: 'portrait',
      pageSize: 'A7',
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
          text : object.date,
          style : 'detail',
          margin : [150, 10, 0, 5]
        },
        {
          style : 'account',
          margin : [139, 10, 0, 10],
          alignment : 'center',
          table : {
            alignment : 'center',
            body : object.produit,
            border: [false, false, false, false],
          },
          layout : {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            hLineStyle: function (i, node) {
              if (i === 0 || i === node.table.body.length) {
                return null;
              }
              return {dash: {length: 10, space: 4}};
            },
            vLineStyle: function (i, node) {
              if (i === 0 || i === node.table.widths.length) {
                return null;
              }
              return {dash: {length: 4}};
            },
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
        text : object.subTotal,
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
    console.log(typeof(object.montant_recu));

    if (typeof(object.montant_recu) === 'object') {

      object.montant_recu.forEach(element => {
        object.produit.push(element);
      });

    } else {
      const pe = [
        {
          border : [false, false, false, false],
          text : '1er versement',
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
    }





    const pre_p = [
      {
        border : [false, false, false, false],
        text : 'Reste à payer',
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

    console.log(object);

    const def = this.generateEchelonneContent(object);
    // { content: 'A sample PDF document generated using Angular and PDFMake' };
    try {
      this.pdfMake.createPdf(def).open();
    } catch (error) {
      console.log(error);
    }
  }

}
