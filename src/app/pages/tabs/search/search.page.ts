import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('searchInput') sInput;
  model: any = {
    icon: 'search-outline',
    title: 'No Restaurants Record Found'
  };
  isLoading: boolean;
  query: any;
  allRestaurants: any[] = [
    {
      uid: '12wefdss',
      cover: 'assets/imgs/eru.jpg',
      name: 'Chez_Mami_Eru',
      short_name: 'Eru',
      cuisines: [
        'Cameroun',
        'Bamenda'
      ],
      rating: 5,
      delivery_time: 25,
      distance: 2.5,
      price: 2000
    },
    {
      uid: '12wefdefsdss',
      cover: 'assets/imgs/okok.jpeg',
      name: 'Mami_Okok',
      short_name: 'okok ',
      cuisines: [
        'Cameroun',
        'Centre'
      ],
      rating: 5,
      delivery_time: 25,
      distance: 2.5,
      price: 1500
    },
    {
      uid: '12wefdssrete',
      cover: 'assets/imgs/Taro.jpg',
      name: 'La_Maison_Du_Taro',
      short_name: 'Taro',
      cuisines: [
        'Cameroun',
        'Ouest'
      ],
      rating: 5,
      delivery_time: 25,
      distance: 2.5,
      price: 2000
    },
  ];
  restaurants: any[] = [];

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
  }

  async onSearchChange(event) {
    console.log(event.detail.value);
    this.query = event.detail.value.toLowerCase();
    this.restaurants = [];
    if(this.query.length > 0) {
      this.isLoading = true;
      setTimeout(async() => {
        this.restaurants = await this.allRestaurants.filter((element: any) => {
          return element.short_name.includes(this.query);
        });
        console.log(this.restaurants);
        this.isLoading = false;
      }, 3000);
    }
  }

}
