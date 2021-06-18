import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecapService } from '../services/recap.service';
import * as JsPDF from 'jspdf'; 
import * as html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-recap-management',
  templateUrl: './recap-management.component.html',
  styleUrls: ['./recap-management.component.css']
})
export class RecapManagementComponent implements OnInit {
visibility;
report;
now;
sales;
reservations;
caissier;
@ViewChild('content') content: ElementRef;
  constructor(private recapService: RecapService) { }

  ngOnInit(): void {
    this.now = new Date().toLocaleDateString();
    this.getReport();
  }


  getReport() {
    this.visibility = true;
    this.recapService.getRapport().subscribe(
      (data) => {
        console.log(data);
        this.caissier = data[0].dataCaissier;
        this.sales = data[0].ventes;
        this.reservations = data[0].reservations;
        this.visibility = false;
      }, (err) => {
        console.log(err);
        this.visibility = false;
      }
    );
  }



  print() {
    window.print()
  }


  savePDF() {
    const element = document.getElementById('paper');
    var opt = {
      margin:       0.05,
      filename:     'Recap-journalier.pdf',
      html2canvas:  { scale: 1 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf()
      .set(opt)
      .from(element)
      .save();
    
    setTimeout( () => {
      document.getElementById('btn-print').style.display = 'block';
    }, 500);
  }



  /*public SavePDF(): void {  
    let content=this.content.nativeElement;  
    let doc = new jsPDF();  
    let _elementHandlers =  
    {  
      '#editor':function(element,renderer){  
        return true;  
      }  
    };  
    doc.fromHTML(content.innerHTML,15,15,{  
  
      'width':190,  
      'elementHandlers':_elementHandlers  
    });  
  
    doc.save('test.pdf');  
  }  */

}
