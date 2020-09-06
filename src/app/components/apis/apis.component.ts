import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.css']
})
export class ApisComponent {

  apis: string[] = [
    'scigraphDOI', 's2', 's2arxiv', 'crossrefDOI', 'arxiv', 'elsevierDOI', 'omdb'
  ];

}
