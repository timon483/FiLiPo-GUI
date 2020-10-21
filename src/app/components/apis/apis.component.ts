import {Component, ElementRef, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.css']
})
export class ApisComponent {

  serverError = null;
  apis = null;
  databases = null;
  selectedAPI = null;

  constructor( private http: HttpClient, private element: ElementRef) {
    console.log('test');
    this.getAPIs();
  }

  private getAPIs () {

    this.http.get(environment.databaseURL).subscribe(data1 => {
      this.databases = JSON.parse(JSON.stringify(data1));
      this.apis = this.databases.apis;
    }, error => {
      this.serverError = true;
    });
  }

}
