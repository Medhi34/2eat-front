import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  profile: any = {};
  isLoading: boolean;
  orders = [];

  constructor() { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    setTimeout(() => {
      this.profile = {      
        name: 'Morgann Wess',
        phone: '696834486',
        email: 'morgannwess00@gmail.com'  
      };
      this.orders = [      
        {
          address: {address: "Yaoundé, Nkolbisson", house: "dsgd", id: "cLQdnS8YXk5HTDfM3UQC", landmark: "fdgs", lat: 26.108991978867923, lng: 91.79069981213378, title: "yui", user_id: "UA5JWxgjDOYgfXe92H0pFHwulTz2" }, 
          deliveryCharge: 20,
          grandTotal: "3500",
          id: "5aG0RsPuze8NX00B7uRP",
          order: [
            {category_id: "e10", cover: "assets/imgs/okok.jpeg", desc: "Great in taste", id: "i32", name: "Bahamas", price: 270, quantity: 1, rating: 0, status: true, uid: "r5", variation: false, veg: false},
            {category_id: "e10", cover: "assets/imgs/gateau.jpg", desc: "Great in taste", id: "i33", name: "Mofongo", price: 250, quantity: 1, rating: 0, status: true, uid: "r5",variation: false, veg: true}
          ],
          paid: "COD",  
          restaurant: {address: "Yaounde,Nkolbisson",  city: "909090567", closeTime: "21:00", cover: "", cuisines: ["African Foods"], delivery_time: 25, description: "dd", email: "mamiokok@gmail.com", latitude: 26.1286243, longitude: 91.8012675, id: "r5", isClose: true, name: "DosaPlaza", openTime: "07:00", phone: 6619563867, price: 27, rating: 4.7, short_name: "stayfit", status: "open", totalRating: 13},
          restaurant_id: "r5",  
          status: "created",
          time: "Jul 6, 2020 11:44 AM",
          total: "520.00",
          user_id: "1"
        },
        {
          address: {address: "Yaounde,Nkolbisson", house: "dsgd", id: "cLQdnS8YXk5HTDfM3UQC", landmark: "fdgs", lat: 26.108991978867923, lng: 91.79069981213378, title: "yui", user_id: "UA5JWxgjDOYgfXe92H0pFHwulTz2" }, 
          deliveryCharge: 20,
          grandTotal: "440.00",
          id: "5aG0RsPuze8NX00B7uR1",
          order: [
            {category_id: "e00", cover: "assets/imgs/pizza.jpg", desc: "Great in taste", id: "i1", name: "Pizza", price: 120, quantity: 1, rating: 0, status: true, uid: "r1", variation: false, veg: false},
            {category_id: "e00", cover: "assets/imgs/pasta.jpg", desc: "Great in taste", id: "i3", name: "Pasta", price: 150, quantity: 2, rating: 0, status: true, uid: "r1", variation: false, veg: false}
          ],
          paid: "COD",  
          restaurant: {address: "Yaounde, Nkolbisson", city: "909090271", closeTime: "20:00", cover: "assets/imgs/pizza.jpg", cuisines: ["African Foods"], delivery_time: 25, description: "dd", email: ".com", id: "r1", isClose: true, latitude: 26.1286243, longitude: 91.8012675, name: "Stayfit", openTime: "08:00", phone: 6786745745, price: 25, rating: 0, short_name: "stayfit", status: "open", totalRating: 0},    restaurant_id: "r1",  
          status: "Delivered",
          time: "Jul 7, 2020 11:44 AM",
          total: "420.00",
          user_id: "1"
        },
      ];
      this.isLoading = false;      
    }, 3000);
  }

  logout() {}

  reorder(order) {
    console.log(order);
    
  }

  getHelp(order) {
    console.log(order);
  }

}
