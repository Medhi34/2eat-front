import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
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
  isLoading = false;
  meal!:Meal;

  orderForm!:FormGroup;

  @ViewChild(IonModal) modal!: IonModal;
  order:Order = new Order();
  textLanguage!:any;

  constructor(private api:ApiService, private route:ActivatedRoute, private router:Router, 
    private toastController: ToastController, private formBuilder:FormBuilder, private file:FileService, private translate:TranslateService) { }

  ngOnInit() {
    this.translate.get('MEAL_DETAILS').subscribe((res) => this.textLanguage = res);
    this.loadData();
    this.orderForm = this.formBuilder.group({
      hot: new FormControl(this.order.hot, Validators.required),
      spiced: new FormControl(this.order.spiced, Validators.required),
      accompagnement: new FormControl(""),
      others: new FormControl("")
    })
  }

  loadData(){
    const id = this.route.snapshot.paramMap.get('id') || "";
    this.api.getMealById(id).subscribe((val:any) => {
      this.meal = {
        ...val,
        images: new Map<string, Image>(Object.entries(val.images))
      }
      this.file.isFavourite(this.meal._id)
        .then(bool => {
          if(bool){
            this.meal.isFavourite = true;
          }
        })
      this.isDone = true;
    });
  }

  makeFavourite(){
    this.meal.isFavourite = !this.meal.isFavourite;
    if(this.meal.isFavourite){
      this.file.addFavourite(this.meal._id)
    }else{
      this.file.removeFavourite(this.meal._id);
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.isLoading = true;
    const userToken = JSON.parse(localStorage.getItem("userToken") || "undefined");
    this.order.user = userToken.userId;
    this.order.hot = this.orderForm.get('hot')?.value;
    this.order.spiced = this.orderForm.get('spiced')?.value;
    this.order.others = this.orderForm.get('others')?.value;
    this.order.accompagnement = this.orderForm.get('accompagnement')?.value;
    this.order.date = new Date();
    this.order.meal = this.meal;

    this.api.saveOrder(this.order, this.meal._id).subscribe(val => {
      console.log('val :>> ', val);
      this.isLoading = false;
      this.presentToast("Commande enregistré !");
    });
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

  onClickCommand(){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken){
      this.modal.present();
    }else{
      this.presentToast("Vous devez être connecté !");
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
