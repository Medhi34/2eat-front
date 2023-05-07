import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  id: any;
  data: any = {};
  items: any[] = [];
  veg: boolean = false;
  isLoading: boolean;
  cartData: any = {};
  storedData: any = {};
  model = {
    icon: 'fast-food-outline',
    title: 'No Menu Available'
  };
  restaurants = [
    {
      uid: '12wefdss',
      cover: 'assets/imgs/eru.jpg',
      name: 'Chez_Mami_Eru',
      short_name: 'Eru',
      address: 'Yaounde, Nkolbisson',
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
      short_name: 'okok',
      cuisines: [
        'Cameroun',
        'Centre'
      ],
      rating: 5,
      delivery_time: 25,
      address: 'Yaounde, Nkolbisson',
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
      address: 'Yaounde, Nkolbisson',
      distance: 2.5,
      price: 100
    },
  ];
  
  categories: any[] = [
    {
      id: "e00",
      name: "Patisserie",
      uid: "12wefdss"
    },
    {
      id: "e0",
      name: "Repas",
      uid: "12wefdss"
    },
  ]; 

  allItems = [
    {
        category_id: "e00",
        cover: "assets/imgs/gateau.jpg",
        desc: "Les nouvelles sensations",
        id: "i1",
        name: "Patisserie",
        price: 500,
        rating: 0,
        status: true,
        uid: "12wefdss",
        variation: false,
        veg: false
    },
    {
        category_id: "e0",
        cover: "assets/imgs/eru.jpg",
        desc: "Les nouvelles sensations",
        id: "i2",
        name: "Repas",
        price: 2000,
        rating: 0,
        status: true,
        uid: "12wefdss",
        variation: false,
        veg: true
    },
    {
        category_id: "e00",
        cover: "assets/imgs/salad.jpg",
        desc: "Les nouvelles sensations",
        id: "i3",
        name: "Salade",
        price: 1000,
        rating: 0,
        status: true,
        uid: "12wefdss",
        variation: false,
        veg: false
    },
  ];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      console.log('data: ', paramMap);
      if(!paramMap.has('restaurantId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('restaurantId');
      console.log('id: ', this.id);
      this.getItems();
    });
  }

  getCart() {
   return Preferences.get({key: 'cart'});
  }

  async getItems() {
    this.isLoading = true;
    this.data = {};
    this.cartData = {};
    this.storedData = {};
    setTimeout(async() => {      
      let data: any = this.restaurants.filter(x => x.uid === this.id);
      this.data = data[0];
      this.categories = this.categories.filter(x => x.uid === this.id);
      this.items = this.allItems.filter(x => x.uid === this.id);
      console.log('restaurant: ', this.data);
      let cart: any = await this.getCart();
      console.log('cart: ', cart);
      if(cart?.value) {
        this.storedData = JSON.parse(cart.value);
        console.log('storedData: ', this.storedData);
        if(this.id == this.storedData.restaurant.uid && this.allItems.length > 0) {
          this.allItems.forEach((element: any) => {
            this.storedData.items.forEach(ele => {
              if(element.id != ele.id) return;
              element.quantity = ele.quantity;
            })
          })
        }
        this.cartData.totalItem = this.storedData.totalItem;
        this.cartData.totalPrice = this.storedData.totalPrice;
      }
      this.isLoading = false;
    }, 3000);
  }

  vegOnly(event) {
    console.log(event.detail.checked);
    this.items = [];
    if(event.detail.checked == true) this.items = this.allItems.filter(x => x.veg === true);
    else this.items = this.allItems;
    console.log('items: ', this.items);
  }

  quantityPlus(index) {
    try {
      console.log(this.items[index]);
      if(!this.items[index].quantity || this.items[index].quantity == 0) {
        this.items[index].quantity = 1;
        this.calculate();
      } else {
        this.items[index].quantity += 1; // this.items[index].quantity = this.items[index].quantity + 1
        this.calculate();
      }
    } catch(e) {
      console.log(e);
    }
  }

  quantityMinus(index) {
    if(this.items[index].quantity !== 0) {
      this.items[index].quantity -= 1; // this.items[index].quantity = this.items[index].quantity - 1
    } else {
      this.items[index].quantity = 0;
    }
    this.calculate();
  }

  calculate() {
    console.log(this.items);
    this.cartData.items = [];
    let item = this.items.filter(x => x.quantity > 0);
    console.log('added items: ', item);
    this.cartData.items = item;
    this.cartData.totalPrice = 0;
    this.cartData.totalItem = 0;
    item.forEach(element => {
      this.cartData.totalItem += element.quantity;
      this.cartData.totalPrice += (parseFloat(element.price) * parseFloat(element.quantity));
    });
    this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);
    if(this.cartData.totalItem == 0) {
      this.cartData.totalItem = 0;
      this.cartData.totalPrice = 0;
    }
    console.log('cart: ', this.cartData);
  }

  async saveToCart() {
    try {
      this.cartData.restaurant = {};
      this.cartData.restaurant = this.data;
      console.log('cartData', this.cartData);
      await Preferences.set({
        key: 'cart',
        value: JSON.stringify(this.cartData)
      });
    } catch(e) {
      console.log(e);
    }
  }

  async viewCart() {
    if(this.cartData.items && this.cartData.items.length > 0) await this.saveToCart();
    console.log('router url: ', this.router.url);
    this.router.navigate([this.router.url + '/cart']);
  }

}
