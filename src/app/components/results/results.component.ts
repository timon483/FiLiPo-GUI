import {Component, ElementRef, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results = null;
  alignments = null;
  globals = null;
  serverError = false;
  showingFurther = false;
  zerowidthSpace = '\u200b';
  comma = '.';


  constructor(private http: HttpClient, private element: ElementRef, private router: Router) {
    this.getResults();

  }


  getResults() {
    this.http.get(environment.resultURL).subscribe(data => {
      this.results = JSON.parse(JSON.stringify(data));
      this.globals = this.results.globals;
      this.alignments = this.results.inputRelations[0].alignments;

    }, error => {
      this.serverError = true;
    });
  }


  showFurther() {
   this.showingFurther = !this.showingFurther;
  }



  trimPath(path: string){
    if (path.includes('#')) {
      return path.substring(path.lastIndexOf('#') + 1);
    } else {
      return path.substring(path.lastIndexOf('/') + 1);
    }
  }

  computeConfidence(confidence){
    return Math.round(confidence * 100);
  }

  reformatPath(path){
    return path.replace(this.comma, this.comma + this.zerowidthSpace);
  }


  ngOnInit(): void {
  }

}
