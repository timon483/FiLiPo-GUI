import {Component, ElementRef, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests = 25;
  serverError = false;

  constructor(private http: HttpClient, private element: ElementRef) { }

  changeRequests(event: any){
    const newURL = environment.configURL + '?requests=' + event.value.toString();
    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });
  }

  ngOnInit(): void {
  }



}
