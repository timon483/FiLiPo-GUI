import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.css']
})
export class DatabasesComponent {

  label: string;
  source: string;
  url: string;

  Databases: { label: string; source: string; url: string }[] =
    [{label: 'dblp', source: 'C:/Databases/dblp-2020-04-28/dblp-2020-04-28.nt', url: 'C:/Databases/dblp-2020-04-28/tdb/'},
{label: 'moviedb', source: 'C:/Databases/linked_mdb/fixed_linkedmdb.nt', url: 'C:/Databases/linked_mdb/tdb'}];
}
