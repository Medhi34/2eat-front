import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Image } from 'src/app/models/Image';
import { Meal } from 'src/app/models/Meal';
import { Order } from 'src/app/models/Order';
import { ApiService } from 'src/app/services/api.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.page.html',
  styleUrls: ['./meal-details.page.scss'],
})
export class MealDetailsPage implements OnInit {
  isDone:boolean = false;
  meal!:Meal;
  @ViewChild(IonModal) modal!: IonModal;
  order!:Order;

  constructor(private api:ApiService, private route:ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || "";
    this.api.getMealById(id).subscribe((val:any) => {
      this.meal = {
        ...val,
        images: new Map<string, Image>(Object.entries(val.images))
      }
      this.order = {
        _id: "order",
        user: "",
        meal: this.meal,
        date: new Date(),
        quantity: 1,
        hot: true,
        spiced: false,
        others: ""
      }
      this.isDone = true;
    })
  }

  makeFavourite(){
    // if(this.meal.isFavourite){
    //   this.fileApi.removeFavourite(this.meal._id)
    //   .then(() => this.meal.isFavourite = false)
    // }else{
    //   this.fileApi.makeFavourite(this.meal._id)
    //   .then(() => this.meal.isFavourite = true)
    // }
    
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
