import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';
import {stringify} from 'querystring';
import {FormControl} from '@angular/forms';
import {coerceCssPixelValue} from '@angular/cdk/coercion';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {



  @Input() isChecked = false;
  @Input() isAddData = false;
  @Input() isAddSecret = false;
  @Input() isAddRuleset = false;
  strSim = null;
  recSim = null;
  config = null;
  serverError = null;
  metrics = null;
  ruleset = null;
  linkage = null;
  dbs = null;
  apis = null;
  databases = null;
  secret = null;
  similarityMetrics = ['Equal', 'Equal Normalized', 'Token Equal', 'Token Equal Normalized',
    'Levenshtein', 'Levenshtein Normalized',
    'Damerau-Levenshtein', 'Damerau-Levenshtein Normalized',
    'Optimal-Alignment', 'Optimal-Alignment Normalized',
    'Longest-Common-Subsequence', 'Longest-Common-Subsequence Normalized',
    'Jaccard Token', 'Jaccard Token Normalized',
    'Sorensen-Dice Toke', 'Sorensen-Dice Token Normalized',
    'Overlap Token', 'Overlap Token Normalized',
    'Jaccard 2-grams', 'Jaccard 3-grams', 'Jaccard 4-grams', 'Jaccard 5-grams',
    'Jaccard 2-grams Normalized', 'Jaccard 3-grams Normalized', 'Jaccard 4-grams Normalized', 'Jaccard 5-grams Normalized',
    'Jaccard 2-grams Normalized Padding', 'Jaccard 3-grams Normalized Padding', 'Jaccard 4-grams Normalized Padding', 'Jaccard 5-grams Normalized Padding',
    'Sorensen-Dice 2-grams', 'Sorensen-Dice 3-grams', 'Sorensen-Dice 4-grams', 'Sorensen-Dice 5-grams',
    'Sorensen-Dice 2-grams Normalized', 'Sorensen-Dice 3-grams Normalized', 'Sorensen-Dice 4-grams Normalized', 'Sorensen-Dice 5-grams Normalized',
    'Sorensen-Dice 2-grams Normalized Padding', 'Sorensen-Dice 3-grams Normalized Padding', 'Sorensen-Dice 4-grams Normalized Padding', 'Sorensen-Dice 5-grams Normalized Padding',
    'Overlap 2-grams', 'Overlap 3-grams', 'Overlap 4-grams', 'Overlap 5-grams',
    'Overlap 2-grams Normalized', 'Overlap 3-grams Normalized', 'Overlap 4-grams Normalized', 'Overlap 5-grams Normalized',
    'Overlap 2-grams Normalized Padding', 'Overlap 3-grams Normalized Padding', 'Overlap 4-grams Normalized Padding', 'Overlap 5-grams Normalized Padding',
    'Jaccard 2-shingles', 'Jaccard 3-shingles', 'Jaccard 4-shingles', 'Jaccard 5-shingles',
    'Jaccard 2-shingles Normalized', 'Jaccard 3-shingles Normalized', 'Jaccard 4-shingles Normalized', 'Jaccard 5-shingles Normalized',
    'Sorensen-Dice 2-shingles', 'Sorensen-Dice 3-shingles', 'Sorensen-Dice 4-shingles', 'Sorensen-Dice 5-shingles',
    'Sorensen-Dice 2-shingles Normalized', 'Sorensen-Dice 3-shingles Normalized', 'Sorensen-Dice 4-shingles Normalized', 'Sorensen-Dice 5-shingles Normalized',
    'Overlap 2-shingles', 'Overlap 3-shingles', 'Overlap 4-shingles', 'Overlap 5-shingles',
    'Overlap 2-shingles Normalized', 'Overlap 3-shingles Normalized', 'Overlap 4-shingles Normalized', 'Overlap 5-shingles Normalized'];
  addSelection = false;




  constructor( private http: HttpClient, private element: ElementRef, private router: Router) {
    this.getConfigs();
    this.getDatabasesAndAPIs();
    this.getSecret();
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false; } ;
  }

  private getConfigs () {
    this.http.get(environment.configURL).subscribe(data => {
      this.config = JSON.parse(JSON.stringify(data));
     this.metrics = this.config.linkage_config.similarity_metrics;
     this.ruleset = this.config.ruleset;
     this.strSim = this.config.linkage_config.string_similarity;
     this.recSim = this.config.linkage_config.record_similarity;

    }, error => {
      this.serverError = true;
    });
  }

   metricSlider(metric: string): boolean {
   for (let i = 0; i < this.metrics.length; i++) {
     if (this.metrics[i] === metric) {
       return true;
     }
   }
     return false;
   }

   editMetric(metric: string){

    if (this.metricSlider(metric)) {
      this.removeMetric(metric);
    } else {
      this.addMetric(metric);
    }
   }

  addMetric(metric: string){
    const newURL = environment.configURL + '?addMetric=' + metric;
    this.config.linkage_config.similarity_metrics.push(metric);

    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });
  }

  removeMetric(metric: string){
    const newURL = environment.configURL + '?removeMetric=' + metric;
    this.config.linkage_config.similarity_metrics.pop(metric);
    this.http.get(newURL).subscribe(data => {
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

  private getSecret() {
    this.http.get(environment.secretURL).subscribe(data1 => {
      this.secret = JSON.parse(JSON.stringify(data1));
      this.secret = this.secret.secrets;
    }, error => {
      this.serverError = true;
    });

  }

  private formatMode(value: number) {
    if (value === 0) {
      return 'non-technical user';
    } else if (value === 1) {
      return 'technical user';
    } else if (value === 2) {
      return 'evaluation';
    } else if (value === 3) {
      return 'demo';
    } else { return value; }
  }

  changeLogLevel(event: any) {
    this.config.globals.loglevel = event.value.toString();
  }

  changeCandidateResponses(event: any){
    this.config.linkage_config.candidate_responses = event.value.toString();
  }

  changeMode(event: any) {
    this.config.globals.mode = event.value.toString();
  }

  changeSupportMode(event: any){
    this.config.linkage_config.support_mode = event.value.toString();
  }

  changeStringSimilarity(event: any) {
    this.config.linkage_config.string_similarity = event.value.toString();
  }

  changeRecordSimilarity(event: any) {
    this.config.linkage_config.record_similarity = event.value.toString();
  }

  changeDistributionVariance(event: any) {
    this.config.linkage_config.distribution_variance = event.value.toString();
  }

  changeErrorThreshold(event: any) {
    this.config.linkage_config.error_threshold = event.value.toString();
  }

  editDB(dbLabel: string, index ) {
    const label = (<HTMLInputElement>document.getElementById('db-label' + index )).value;
    const source = (<HTMLInputElement>document.getElementById('db-source' + index )).value;
    const url = (<HTMLInputElement>document.getElementById('db-url' + index )).value;

    const newURL = environment.databaseURL + '?edit=database' + '&oldlabel=' + dbLabel + '&label=' + label + '&url=' + url + '&source=' + source;
    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });

    this.router.navigateByUrl('/settings');


  }

  editSelectionForAPI(APILabel: string, APIindex, selectionIndex){

    const match = (<HTMLInputElement>document.getElementById('selection-minsupport-match' + APIindex + selectionIndex)).value;
    const confidence = (<HTMLInputElement>document.getElementById('selection-confidence' + APIindex + selectionIndex )).value;
    const nonmatch = (<HTMLInputElement>document.getElementById('selection-minsupport-nonmatch' + APIindex + selectionIndex )).value;
    const type = (<HTMLInputElement>document.getElementById('selection-type' + APIindex + selectionIndex )).value;
    const support = (<HTMLInputElement>document.getElementById('selection-support' + APIindex + selectionIndex )).value;

    const newURL = environment.databaseURL + '?editSelectionFor=' + APILabel +  '&selectionIndex=' + selectionIndex  + '&match=' + match + '&nonmatch=' + nonmatch +
      '&confidence=' + confidence + '&type=' + type + '&support=' + support;

    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });

    this.router.navigateByUrl('/settings');

  }

  removeSelection(APILabel: string, APIindex, selectionIndex){
    const newURL = environment.databaseURL + '?removeSelectionFor=' + APILabel + '&selectionIndex=' + selectionIndex;
    console.log(selectionIndex);


    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });

    this.router.navigateByUrl('/settings');

  }

  addNewSelection(){
    this.addSelection = true;



  }

  cancelAddingSelection(){
    this.addSelection = false;
  }

  saveNewSelection(APILabel: string, index){
    console.log(APILabel);
    const match = (<HTMLInputElement>document.getElementById('add-selection-minsupport-match' + index )).value;
    const confidence = (<HTMLInputElement>document.getElementById('add-selection-confidence' + index )).value;
    const nonmatch = (<HTMLInputElement>document.getElementById('add-selection-minsupport-nonmatch' + index )).value;
    const type = (<HTMLInputElement>document.getElementById('add-selection-type' + index )).value;
    const support = (<HTMLInputElement>document.getElementById('add-selection-support' + index )).value;

    const newURL = environment.databaseURL + '?selectionFor=' + APILabel + '&match=' + match + '&nonmatch=' + nonmatch +
      '&confidence=' + confidence + '&type=' + type + '&support=' + support;
    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });

    this.addSelection = false;
    this.router.navigateByUrl('/settings');


  }

  editAPI(APILabel: string, index){
    const apilabel = (<HTMLInputElement>document.getElementById('api-label' + index )).value;
    const name = (<HTMLInputElement>document.getElementById('api-name' + index )).value;
    const url = (<HTMLInputElement>document.getElementById('api-url' + index )).value;
    const paramname = (<HTMLInputElement>document.getElementById('parameters-name' + index )).value;
    const paramstatus = (<HTMLInputElement>document.getElementById('parameters-status' + index )).value;
    const paramtype = (<HTMLInputElement>document.getElementById('parameters-type' + index )).value;
    const paramfilter = (<HTMLInputElement>document.getElementById('parameters-filter' + index )).value;
    const format = (<HTMLInputElement>document.getElementById('api-format' + index )).value;

    const newURL = environment.databaseURL + '?edit=API' + '&oldAPILabel=' + APILabel + '&Alabel=' + apilabel + '&Aname=' + name +
      '&Aurl=' + url + '&parametersname=' + paramname + '&parametersstatus=' + paramstatus + '&parameterstype=' + paramtype
      + '&parametersfilter=' + paramfilter + '&Aformat=' + format ;
    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });

    this.router.navigateByUrl('/settings');

  }

  saveConfigs() {
    this.config.globals.logpath = (<HTMLInputElement>document.getElementById('logpath')).value;
    this.config.globals.outpath = (<HTMLInputElement>document.getElementById('outpath')).value;
    this.config.globals.dbpath = (<HTMLInputElement>document.getElementById('dbpath')).value;
    this.config.globals.scpath = (<HTMLInputElement>document.getElementById('scpath')).value;
    this.config.globals.secretpath = (<HTMLInputElement>document.getElementById('secretpath')).value;
    this.config.globals.ipc = (<HTMLInputElement>document.getElementById('ipc')).value;
    this.config.globals.memory = (<HTMLInputElement>document.getElementById('memory')).value;
    this.config.globals.timeout = (<HTMLInputElement>document.getElementById('timeout')).value;

    const newURL = environment.configURL + '?config=' + JSON.stringify(this.config);

    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });
    console.log(newURL);
    this.router.navigateByUrl('/settings');

  }

  saveOtherConfigs() {
    this.config.linkage_config.similarity_requests = (<HTMLInputElement>document.getElementById('similarity_requests')).value;
    this.config.linkage_config.candidate_requests = (<HTMLInputElement>document.getElementById('candidate_requests')).value;
    this.config.linkage_config.traversal_depth = (<HTMLInputElement>document.getElementById('traversal_depth')).value;
    this.config.linkage_config.functionality_threshold = (<HTMLInputElement>document.getElementById('functionality_threshold')).value;
    this.config.linkage_config.classifier = (<HTMLInputElement>document.getElementById('classifier')).value;
    this.config.linkage_config.min_support_match = (<HTMLInputElement>document.getElementById('min_support_match')).value;
    this.config.linkage_config.min_support_nonmatch = (<HTMLInputElement>document.getElementById('min_support_nonmatch')).value;

    const newURL = environment.configURL + '?config=' + JSON.stringify(this.config);

    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });
    console.log(newURL);
    this.router.navigateByUrl('/settings');
  }

  addAPI() {
    this.isChecked = true;
  }

  saveNewAPI(){
    const label = (<HTMLInputElement>document.getElementById('add-api-label')).value;
    const name = (<HTMLInputElement>document.getElementById('add-api-name')).value;
    const format = (<HTMLInputElement>document.getElementById('add-api-format')).value;
    const url = (<HTMLInputElement>document.getElementById('add-api-url')).value;

    const parametersname = (<HTMLInputElement>document.getElementById('add-parameters-name')).value;
    const parameterstype = (<HTMLInputElement>document.getElementById('add-parameters-type')).value;
    const parametersstatus =  (<HTMLInputElement>document.getElementById('add-parameters-status')).value;
    const parametersfilter = (<HTMLInputElement>document.getElementById('add-parameters-filter')).value;



    const newURL = environment.databaseURL + '?Alabel=' + label + '&Aname=' + name + '&Aformat=' + format +
    '&Aurl=' + url + '&parametersname=' + parametersname + '&parameterstype=' + parameterstype + '&parametersstatus=' + parametersstatus +
    '&parametersfilter=' + parametersfilter;
    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });
    this.router.navigateByUrl('/settings');

  }

  removeAPI(label: string){

    const newURL = environment.databaseURL + '?removeAPI=' + label;

    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });
    this.router.navigateByUrl('/settings');
  }

  addDatabase() {
    this.isAddData = true;
  }

  saveNewDatabase() {
    const label = (<HTMLInputElement>document.getElementById('add-db-label')).value;
    const url = (<HTMLInputElement>document.getElementById('add-db-url')).value;
    const source = (<HTMLInputElement>document.getElementById('add-db-source')).value;

    const newURL = environment.databaseURL + '?label=' + label + '&url=' + url + '&source=' + source;

    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });
    this.router.navigateByUrl('/settings');

  }

  removeDatabase(label: string){

    const newURL = environment.databaseURL + '?deleteDB=' + label;

    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });
    this.router.navigateByUrl('/settings');
  }

  editDatabase(label: string, source: string, url: string) {
    const newURL = environment.databaseURL + '?edit=database' + '&label=' + label + '&url=' + url + '&source=' + source;
    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });

    this.router.navigateByUrl('/settings');
  }

  addSecret(){
    this.isAddSecret = true;
  }

  saveNewSecret(){
    const secretname = (<HTMLInputElement>document.getElementById('add-secret-name')).value;
    const secret = (<HTMLInputElement>document.getElementById('add-secret-secret')).value;

    const newURL = environment.secretURL + '?secretname=' + secretname + '&secret=' + secret;

    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });
    this.router.navigateByUrl('/settings');

  }

  removeSecret(name: string){
    const newURL = environment.secretURL + '?removesecret=' + name;

    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });
    this.router.navigateByUrl('/settings');
  }

  addNewRule(){
    this.isAddRuleset = true;
  }


  saveNewRule(){
    const rulename = (<HTMLInputElement>document.getElementById('add-rule')).value;
    const rulefilter = (<HTMLInputElement>document.getElementById('add-rule-filter')).value;

    const newURL = environment.configURL + '?rulename=' + rulename + '&rulefilter=' + rulefilter;

    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });
    this.isAddRuleset = false;
    this.router.navigateByUrl('/settings');
    }

  removeRule(rule: string){

    const newURL = environment.configURL + '?removeRule=' + rule;

    this.http.get(newURL).subscribe(data => {
    }, error => {
      this.serverError = true;
    });
    this.router.navigateByUrl('/settings');
  }


  ngOnInit() {
  }



}
