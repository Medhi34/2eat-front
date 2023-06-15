import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, ToastController } from '@ionic/angular';
import { Meal } from 'src/app/models/Meal';
import { ApiService } from 'src/app/services/api.service';
import { FileService } from 'src/app/services/file.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-update-meals',
  templateUrl: './update-meals.component.html',
  styleUrls: ['./update-meals.component.scss'],
})
export class UpdateMealsComponent  implements OnInit {

  @Input() restaurantId!:string;
  @ViewChild("formModal") formModal!:IonModal;

  isDone = false;
  isLoading = false;
  mealForm!:FormGroup;
  meals = new Map<string, Meal>();

  constructor(public photoService:PhotoService, private api:ApiService, private alertController: AlertController, 
    private formBuilder: FormBuilder, private file:FileService, private toastController: ToastController) { }

  ngOnInit() {
    this.api.getMealsOfRestaurant(this.restaurantId).subscribe((vals:any) => {
      for(let meal of vals){
        this.meals.set(meal._id, meal);
      }
      this.isDone = true;
    });

    this.mealForm = this.formBuilder.group({
      name: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      accompagnements: new FormControl("")
    })
  }

  async addMealPhotoToGallery() {
    await this.photoService.addNewToGallery();
  }

  handleInput(event:any){
  }

  openForm(){
    this.photoService.photos = [];
    this.formModal.present();
  }

  onDelete(id:any){
    if(this.meals.size > 1){
      this.presentAlert(id);
    }else{
      this.presentToast();
    }
  }

  cancel(){
    this.formModal.dismiss();
  }

  async confirmAdd(){
    this.isLoading = true;
    const meal = {...this.mealForm.value}
    meal.accompagnements = meal.accompagnements.replaceAll("\n", "").split(",").map((item: any) => item.trimStart());
    const formData = new FormData();
    for(let image of this.photoService.photos){
      await this.file.createFile(image).then(file => {
        formData.append("images", file, image.filepath);
      });
    }
    meal.restaurant = this.restaurantId;
    formData.append("meal", JSON.stringify(meal));
    this.api.createMeal(formData, this.restaurantId).subscribe(msg => {
      this.formModal.dismiss();
      this.isLoading = false;
      this.isDone = false;
      setTimeout(() => this.ngOnInit(), 200);
    });
    
  }

  async presentAlert(id:string) {
    const alert = await this.alertController.create({
      header: 'Attention',
      message: 'Voulez-vous vraiment supprimer ce repas ?',
      buttons: [
        {
          text: "Oui",
          handler: () => {
            this.api.deleteMeal(this.restaurantId, id).subscribe(msg => {
              this.isDone = false;
              this.meals.delete(id);
              setTimeout(() => this.ngOnInit(), 200);
            });
          }
        },
        {
          text: "Annuler",
          role: "cancel",
          handler: () => {}
        }
      ]
    });
  
    await alert.present();
  }
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Vous ne pouvez avoir aucun repas.',
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
}
