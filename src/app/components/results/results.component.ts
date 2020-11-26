import {Component, ElementRef, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {keyframes} from '@angular/animations';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results = null;
  alignment: any[];
  globals = null;
  serverError = false;
  showingFurther = false;
  zerowidthSpace = '\u200b';
  comma = '.';
  resultstmp = null;
  showAlignment = null;



  constructor(private http: HttpClient, private element: ElementRef, private router: Router) {
    this.getResults();

  }


  getResults() {
    this.http.get(environment.resultURL).subscribe(data => {
      this.results = JSON.parse(JSON.stringify(data));
      this.resultstmp = this.results.result;
      this.globals = this.results.globals;
     // this.alignment.push(this.resultstmp[0].value.inputRelations[0].alignments);
   //   console.log(this.alignment);

      
      this.showAlignment = new Map();
      for (let i = 0; i < this.resultstmp.length; i++){
        this.showAlignment.set(this.resultstmp[i].name, false);
      }

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
    } else if (path.includes('/')) {
      return path.substring(path.lastIndexOf('/') + 1);
    } else {
      return path.substring(path.lastIndexOf('\\') + 1);
    }
  }

  computeConfidence(confidence){
    return Math.round(confidence * 100);
  }

  reformatPath(path){
    return path.replace(this.comma, this.comma + this.zerowidthSpace);
  }

  showAlignmentFunc(name){
    let tmp = this.showAlignment.get(name);
    this.showAlignment.forEach((value, key) => {
      this.showAlignment.set(key, false);
    });

    if (tmp === false) {
      this.showAlignment.set(name, true);
    }
  }

  getAlignment(name){
    return this.showAlignment.get(name);
  }

  ngOnInit(): void {
  }

}
