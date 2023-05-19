import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/models/Image';
import { Restaurant } from 'src/app/models/Restaurant';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  isDone:boolean = false;
  restaurants:Restaurant[] = [];

  constructor(private api:ApiService) { }

  ngOnInit() {
    this.api.getAllRestaurants().subscribe(vals => {
      this.restaurants = vals
      this.isDone = true;
    })
  }



}
