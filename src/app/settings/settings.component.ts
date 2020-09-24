import {Component, ElementRef, OnInit} from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';




@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  config = null;
  serverError = null;
  metrics = null;
  ruleset = null;
  dbs = null;
  apis = null;
  databases = null;
  secret = null;

  constructor( private http: HttpClient, private element: ElementRef) {
    console.log('test');
    this.getConfigs();
    this.getDatabasesAndAPIs();
    this.getSecret();
    console.log(this.secret);
  }

  private getConfigs () {
    this.http.get(environment.configURL).subscribe(data => {
      this.config = JSON.parse(JSON.stringify(data));
     this.metrics = this.config.linkage_config.similarity_metrics;
     this.ruleset = this.config.ruleset;
    }, error => {
      this.serverError = true;
    });
  }

  private getDatabasesAndAPIs () {

    this.http.get(environment.databaseURL).subscribe(data1 => {
      this.databases = JSON.parse(JSON.stringify(data1));
      this.dbs = this.databases.endpoints;
       this.apis = this.databases.apis;
    }, error => {
      this.serverError = true;
    });
  }

  private getSecret(){
    this.http.get(environment.secretURL).subscribe(data1 => {
      this.secret = JSON.parse(JSON.stringify(data1));
    }, error => {
      this.serverError = true;
    });

  }

  private onChange(){
    console.log(this.config);
  }

  private formatMode(value: number){
    if (value === 0) {
      return 'non-technical user';
    } else if (value === 1) {
      return 'technical user';
    } else if (value === 2) {
      return 'evaluation';
    } else if (value === 4) {
      return 'demo';
    } else { return value; }
  }

  ngOnInit() {
  }


  /*formatLabel(value: number) {
    if (value > 0) {
      return value / 10;
    }

    return value;
  }
*/

}
