import {Component, ElementRef, OnInit} from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient} from '@angular/common/http';




@Component({
  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.css']
})
export class DatabasesComponent {

  serverError = null;
  dbs = null;
  databases = null;

  constructor( private http: HttpClient, private element: ElementRef) {
    this.getDatabases();
  }

  private getDatabases () {

    this.http.get(environment.databaseURL).subscribe(data1 => {
      this.databases = JSON.parse(JSON.stringify(data1));
      this.dbs = this.databases.endpoints;
    }, error => {
      this.serverError = true;
    });
  }


  ngOnInit() {
  }





}
