import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/models/Image';
import { Restaurant } from 'src/app/models/Restaurant';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  images:Map<string, Image> = new Map();
  restaurants:Restaurant[] = [];
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

    let localisation = {
      longitude: 3,
      latitude: 4,
      country: "Cameroun",
      city: "Yaoundé",
      area: "Nkolbisson",
      _id: "locate01"
    }

    this.restaurants = [
      {
        _id: "restau01",
        name: "Restaurant Chez Martin",
        phone: 699090009,
        user: "user01",
        date_save: new Date(),
        localisation: localisation,
        categories: ['Street-food', 'Caféteria'],
        nbVotes: 5,
        images: this.images,
        meals: [],
        appreciations: []
      },
      {
        _id: "restau02",
        name: "Restaurant Chez Franck",
        phone: 699090009,
        user: "user02",
        date_save: new Date(),
        localisation: localisation,
        categories: ['Street-food', 'Caféteria'],
        nbVotes: 10,
        images: this.images,
        meals: [],
        appreciations: []
      },
      {
        _id: "restau03",
        name: "The Famous",
        phone: 699090009,
        user: "user01",
        date_save: new Date(),
        localisation: localisation,
        categories: ['Restaurant classique'],
        nbVotes: 255,
        images: this.images,
        meals: [],
        appreciations: []
      },
      {
        _id: "restau04",
        name: "Petite faim",
        phone: 699090009,
        user: "user04",
        date_save: new Date(),
        localisation: localisation,
        categories: ['Fast-food'],
        nbVotes: 501,
        images: this.images,
        meals: [],
        appreciations: []
      }
    ];
  }



}
