import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
pdfFilePath = "../../assets/MANUEL D'UTILISATION CAISSE.docx (3).pdf";
  constructor() { }

  ngOnInit(): void {
  }

}
