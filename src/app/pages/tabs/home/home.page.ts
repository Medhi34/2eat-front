import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  banners: any[] = [];
  restaurants: any[] = [];
  isLoading: boolean = false;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.banners = [  
        {banner: 'assets/imgs/eru.jpg'},
        {banner: 'assets/imgs/okok.jpeg'},
        {banner: 'assets/imgs/Taro.jpg'}  
      ];
      this.restaurants = [
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
      this.isLoading = false;
    }, 3000);
    
  }

}
