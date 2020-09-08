import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';




@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  config = null;
  serverError = null;
  metrics = null;
  dbs = null;
  apis = null;
  databases = null;

  constructor( private http: HttpClient) {
    console.log('test');
    this.getConfigs();
    this.getDatabasesAndAPIs();
  }

  private getConfigs () {
    this.http.get(environment.configURL).subscribe(data => {
      this.config = JSON.parse(JSON.stringify(data));
     this.metrics = this.config.linkage_config.similarity_metrics;
     // console.log(data.linkage_config.similarity_metrics);
     // console.log(this.metrics[1]);
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
