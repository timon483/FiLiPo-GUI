import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DatabasesComponent} from '../components/databases/databases.component';
import {ApisComponent} from '../components/apis/apis.component';
import {RequestsComponent} from '../components/requests/requests.component';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SettingsComponent} from '../settings/settings.component';


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

  @ViewChild(SettingsComponent)
  private settings: SettingsComponent;

  serverError = null;
  result = null;
  probingProgress = null;
  aligningProgress = null;
  message = null;
  probingPhase = false;
  aligningPhase = false;
  alignmentResult = null;
  processFinished = false;
  globals = null;
  alignments = null;

  myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:7070/events/*');



  constructor() {

  }



  submit() {
    console.log(this.database.selectedDB);
    console.log(this.apis.selectedAPI);
    console.log(this.requests.requests);
    console.log(this.settings.strSim);
    console.log(this.settings.recSim);




    this.myWebSocket.next(this.database.selectedDB + ' ' + this.apis.selectedAPI + ' ' + this.requests.requests +
    ' ' + this.settings.strSim + ' ' + this.settings.recSim);

    this.probingPhase = true;


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
            this.probingPhase = false;
            this.aligningPhase = true;
            this.aligningProgress = this.message.current * 100 / this.message.max;
          }

          if (this.message.author === 'Result'){
            this.processFinished = true;
            this.alignmentResult = JSON.parse(this.message.message);
            this.globals = this.alignmentResult.globals;
            this.alignments = this.alignmentResult.inputRelations[0].alignments;
            console.log(this.globals);
            console.log(this.alignments);
          }
        }
      },
      // Called whenever there is a message from the server
      err => console.log(err),
      // Called if WebSocket API signals some kind of error
      () => console.log('complete')
      // Called when connection is closed (for whatever reason)
    );
  }

  ngOnInit() {
}




}
