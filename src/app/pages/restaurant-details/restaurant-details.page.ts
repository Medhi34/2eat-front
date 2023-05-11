import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Appreciation } from 'src/app/models/Appreciation';
import { Image } from 'src/app/models/Image';
import { Restaurant } from 'src/app/models/Restaurant';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.page.html',
  styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit {

  images:Map<string, Image> = new Map();
  restaurant!:Restaurant;
  @ViewChild(IonModal) modal!: IonModal;
  appreciation!:Appreciation;

  constructor() { }

  ngOnInit() {
    this.images.set("img01", {
      url:"/assets/img/card-media.png",
      isActive: true,
      _id: ""
    });
    this.images.set("img02", {
      url:"/assets/img/card-media.png",
      isActive: true,
      _id: ""
    });
    this.images.set("img03", {
      url:"/assets/img/card-media.png",
      isActive: true,
      _id: ""
    });

    this.restaurant = {
      _id: "res01",
    name: "Restaurant Chez Martin",
    phone: 699090090,
    user: "user01",
    date_save: new Date(),
    localisation: {
      longitude: 3,
      latitude: 4,
      country: "Cameroun",
      city: "Yaoundé",
      area: "Nkolbisson",
      _id: "locate01"
    },
    categories: ['Street-food', 'Caféteria'],
    nbVotes: 5,
    images: this.images,
    meals: [],
    appreciations: []
    }
  }

}
