import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/Restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent  implements OnInit {

  @Input() restaurant!:Restaurant;
  @Input() distance!:number;
  constructor() { }

  ngOnInit() {}

}
