import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DatabasesComponent} from '../components/databases/databases.component';
import {ApisComponent} from '../components/apis/apis.component';
import {RequestsComponent} from '../components/requests/requests.component';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(DatabasesComponent)
  private database: DatabasesComponent;

  @ViewChild(ApisComponent)
  private apis: ApisComponent;

  @ViewChild(RequestsComponent)
  private requests: RequestsComponent;

  serverError = null;
  result = null;
  probingProgress = null;
  aligningProgress = null;
  message = null;

  myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:7070/events/*');


  constructor(private http: HttpClient) {



  }



  submit() {
    console.log(this.database.selectedDB);
    console.log(this.apis.selectedAPI);
    console.log(this.requests.requests);

    this.myWebSocket.next(this.database.selectedDB + ' ' + this.apis.selectedAPI + ' ' + this.requests.requests);


    this.myWebSocket.subscribe(
      msg => { this.message = JSON.parse(JSON.stringify(msg));
        if (this.message != null) {
          if (this.message.author === 'Server') {
            this.result = this.message.message;
          }
          if (this.message.author === 'ProbingPhase') {
            this.probingProgress = this.message.current * 100 / this.message.max;
          }
          if (this.message.author === 'AligningPhase') {
            this.aligningProgress = this.message.current * 100 / this.message.max;
          }
        }
      },
      // Called whenever there is a message from the server
      err => console.log(err),
      // Called if WebSocket API signals some kind of error
      () => console.log('complete')
      // Called when connection is closed (for whatever reason)
    );


    /*if (this.message != null) {
      if (this.message.author === 'Server') {
        this.result = JSON.stringify(this.message);
      }
      if (this.message.author === 'ProgressBar') {
        this.progress = this.message.current;
      }
    }*/


  }

  ngOnInit() {
}

}
