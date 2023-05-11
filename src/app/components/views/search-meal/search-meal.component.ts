import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/models/Image';
import { Meal } from 'src/app/models/Meal';

@Component({
  selector: 'app-search-meal',
  templateUrl: './search-meal.component.html',
  styleUrls: ['./search-meal.component.scss'],
})
export class SearchMealComponent  implements OnInit {

  images:Map<string, Image> = new Map();
  @Input() meals:Meal[] = [];
  results:Meal[] = [];

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
    this.meals = [
      {
        _id: "test01",
        name: "Eru",
        images: this.images,
        accompagnements: ["Water-fufu", "Couscous tapioca"],
        price: 1500,
        restaurant: null,
        isFavourite: true
      },
      {
        _id: "test02",
        name: "Okok sucré",
        images: this.images,
        accompagnements: ["Batôn de manioc", "Manioc"],
        price: 1000,
        restaurant: null,
        isFavourite: false
      },
      {
        _id: "test03",
        name: "Sauce jaune",
        images:this.images,
        accompagnements: ["Taro"],
        price: 1500,
        restaurant: null,
        isFavourite: false
      },
      {
        _id: "test04",
        name: "Ndolè",
        images: this.images,
        accompagnements: ["Riz", "Miondo", "Frites de plaintain"],
        price: 2000,
        restaurant: null,
        isFavourite: true
      }
    ];
    this.results = [...this.meals];
  }

  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    this.results = this.meals.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }

}
