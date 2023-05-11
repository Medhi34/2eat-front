import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  selectedSegment!:string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.selectedSegment = this.route.snapshot.paramMap.get('type') || 'Tous';
  }

  segmentChosen(name:string){
    this.selectedSegment = name;
  }
}
