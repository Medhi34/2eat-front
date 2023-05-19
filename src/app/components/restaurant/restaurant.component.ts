import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/models/Image';
import { Restaurant } from 'src/app/models/Restaurant';
import { GeolocalisationService } from 'src/app/services/geolocalisation.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent  implements OnInit {

  @Input() restaurant!:Restaurant;
  distance:number = 0;

  constructor(private location:GeolocalisationService) { }

  ngOnInit() {
    this.restaurant.images = new Map<string, Image>(Object.entries(this.restaurant.images));
    this.location.getCurrentPosition()
      .then(coords => {
        this.distance = this.location.getDistance(
          this.restaurant.localisation.latitude,
          this.restaurant.localisation.longitude,
          coords.latitude,
          coords.longitude
        )
      });
  }

}
