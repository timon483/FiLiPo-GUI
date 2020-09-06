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
  metrics;

  constructor( private http: HttpClient) {
    console.log('test');
    this.getConfigs(); }

  private getConfigs () {
    this.http.get(environment.configURL).subscribe(data => {
      this.config = JSON.parse(JSON.stringify(data));
      this.metrics = data.linkage_config.similarity_metrics;
     // console.log(data.linkage_config.similarity_metrics);
     // console.log(this.metrics[1]);
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
