import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  items:Array<any> = []
  SHOW_END_ICONS: boolean;
  SHOW_START_ICONS: boolean;
  START_DATE_ASC: boolean;
  ID_ASC: boolean = true;
  CITY_ASC: boolean = true;
  PRICE_ASC: boolean = true;
  END_DATE_ASC: boolean;
  startdate: Date = new Date();
  enddate: Date = new Date();
  filitem: Array<any> = []
  original: Array<any> = []
  showloader:boolean = false
  constructor(private dataService: DataService,){ }
  ngOnInit() {
    this.showloader = true
    this.dataService.getLocation().subscribe((data) => {
     this.items = data
     this.original = data
     this.showloader=false
    },
    err => console.log(err))
  }

  sortByField(sortByColumn) {
    this.SHOW_START_ICONS = false;
    this.SHOW_END_ICONS = true;
    if (sortByColumn === 'id') {
      if (this.ID_ASC == false) {
        this.items.sort((a, b) => { return a.id-b.id });
      } else {
        this.items.sort((a, b) => { return b.id-a.id });
      }
      this.ID_ASC = !this.ID_ASC;
    } else if (sortByColumn === 'city') {
      if (this.CITY_ASC == false) {
        this.items.sort(function(a, b) { return a.city.localeCompare(b.city)} );
      } else {
        this.items.sort(function(a, b) { return b.city.localeCompare(a.city)} );
      }
      this.CITY_ASC = !this.CITY_ASC;
    } else if (sortByColumn === 'price') {
      if (this.PRICE_ASC == false) {
        this.items.sort((a, b) => { return a.price-b.price });
      } else {
        this.items.sort((a, b) => { return b.price-a.price });
      }
      this.PRICE_ASC = !this.PRICE_ASC;
    } else if (sortByColumn === 'startdate') {
      if (this.START_DATE_ASC == true) {
        this.items.sort((a, b) => { return <any>new Date(b.start_date) - <any>new Date(a.start_date); });
      } else {
        this.items.sort((a, b) => { return <any>new Date(a.start_date) - <any>new Date(b.start_date); });
      }
      this.START_DATE_ASC = !this.START_DATE_ASC;
    } else {
      this.SHOW_START_ICONS = true;
      this.SHOW_END_ICONS = false;
      if (this.END_DATE_ASC == true) {
        this.items.sort((a, b) => { return <any>new Date(b.end_date) - <any>new Date(a.end_date); });
      } else {
        this.items.sort((a, b) => { return <any>new Date(a.end_date) - <any>new Date(b.end_date); });
      }

      this.END_DATE_ASC = !this.END_DATE_ASC;
    }
  }
  filtertable(){
    let sdate = new Date(this.startdate);
    let edate = new Date(this.enddate);
    // console.log(t.start_date, sdate.toISOString(), edate.toISOString())
    this.filitem = this.original.filter(t=>t.start_date >= sdate.toISOString() && t.start_date <= edate.toISOString() && t.end_date >= sdate.toISOString() && t.end_date <= edate.toISOString());
    this.items = Object.assign(this.filitem)
  }
  reset(){
    this.items = Object.assign(this.original)
    this.startdate = null;
    this.enddate = null
  }

}
