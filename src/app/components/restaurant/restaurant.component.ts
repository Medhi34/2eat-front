import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from 'src/app/models/Image';
import { Localisation } from 'src/app/models/Localisation';
import { Restaurant } from 'src/app/models/Restaurant';
import { GeolocalisationService } from 'src/app/services/geolocalisation.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent  implements OnInit {

  @Input("restaurant") restaurant!:Restaurant;
  @Input("distance") distance!:number;

  constructor() { }

  ngOnInit() {
    this.restaurant.images = new Map<string, Image>(Object.entries(this.restaurant.images));
  }

}
