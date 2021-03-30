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

  generateContent() {
    var definition = {
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
          text : 'Client : Mohamed Zidane',
          style : 'subContent',
          margin : [0, 20, 0, 0],
          alignment: 'center'
        },
        {
          text : 'Vendeur : Mohamed Zidane',
          style : 'subContent',
          margin : [0, 5, 0, 0],
          alignment: 'center'
        },
        {
          text : '16-02-2016',
          style : 'detail',
          margin : [100, 10, 0, 5]
        },
        {
          text : 'Ticket 2016-02-1-256',
          style : 'detail',
          margin : [100, 5, 0, 5]
        },
        {
          alignement : 'justify',
          margin : 45,
          columns : [
            {
              text : '1',
              alignment: 'center'
            },
            {
              text : 'Sac Louis Vuiton',
              alignment: 'center'
            },
            {
              text : '15 000',
              alignment: 'center'
            },
            {
              text : '15 000',
              alignment: 'center'
            }
          ]
        },
        {
          alignement : 'justify',
          margin : 5,
          columns : [
            {
              text : 'TOTAL',
            },
            {
              text : 'EUR',
              alignment: 'center'
            },
            {
              text : '15 000',
              alignment: 'center'
            }
          ]
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
        }
      }
    };

    return definition;
  }

  async generatePdf() {

    await this.loadPdfMaker();

    const def = this.generateContent();
    // { content: 'A sample PDF document generated using Angular and PDFMake' };
    this.pdfMake.createPdf(def).open();
  }
}
