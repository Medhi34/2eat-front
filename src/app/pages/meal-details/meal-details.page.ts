import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Image } from 'src/app/models/Image';
import { Meal } from 'src/app/models/Meal';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.page.html',
  styleUrls: ['./meal-details.page.scss'],
})
export class MealDetailsPage implements OnInit {

  images:Map<string, Image> = new Map();
  meal!:Meal;
  @ViewChild(IonModal) modal!: IonModal;
  order!:Order;

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
    this.meal = {
      _id: "test",
      name: "Ndolè",
      images: this.images,
      accompagnements: ["Riz", "Miondo", "Frites de plaintain"],
      price: 2000,
      restaurant: null,
      isFavourite: true
    }
    this.order = {
      _id: "order",
      user: "user01",
      meal: this.meal,
      date: new Date(),
      quantity: 1,
      hot: true,
      spiced: false,
      others: ""
    }
  }

  makeFavourite(){
    this.meal.isFavourite = this.meal.isFavourite ? false : true;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss();
  }

  addQuantity(){
    this.order.quantity+=1;
  }

  removeQuantity(){
    if(this.order.quantity > 1){
      this.order.quantity-=1;
    }
  }

  onWillDismiss(event: Event) {
    // const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // if (ev.detail.role === 'confirm') {
    //   this.message = `Hello, ${ev.detail.data}!`;
    // }
  }

}
