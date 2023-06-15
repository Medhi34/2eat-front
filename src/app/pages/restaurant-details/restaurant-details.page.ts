import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, IonModal } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { Image } from 'src/app/models/Image';
import { apiKey } from 'src/app/models/url_api';
import { ApiService } from 'src/app/services/api.service';
import { GeolocalisationService } from 'src/app/services/geolocalisation.service';
import { DisplayedRestaurant } from 'src/app/models/RestaurantDisplayed';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.page.html',
  styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit {

  isContributor = false;
  isConnected = false;
  userId = "";
  isDone:boolean = false;
  displayedRestaurant!:DisplayedRestaurant;
  @ViewChild("mealModal") mealModal!: IonModal;
  @ViewChild("modifyImagesModal") modifyImagesModal!: IonModal;
  @ViewChild("modifyInfosModal") modifyInfosModal!: IonModal;
  @ViewChild("modifyLocalisationModal") modifyLocalisationModal!: IonModal;
  @ViewChild("modifyMealsModal") modifyMealsModal!: IonModal;
  newMap!: GoogleMap;

  constructor(private api:ApiService, private route:ActivatedRoute, private location:GeolocalisationService, 
    private actionSheetController: ActionSheetController, private file:FileService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || "null";
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken){
      this.loadDataForUserOnline(userToken, id);
    }else{
      this.loadDataForUserOffline(id);
    }
  }

  checkIsContributor(){
    const contributorId = this.route.snapshot.paramMap.get('userId') || "null";
    if(contributorId && this.displayedRestaurant.restaurant.user == contributorId){
      this.isContributor = true;
    }
  }

  loadDataForUserOnline(userToken:any, id:any){
    this.userId = userToken.userId;
    this.isConnected = true;
    this.api.getUserById(userToken.userId).subscribe((val:any) => {
      this.api.getRestaurantById(id, val.localisation.latitude, val.localisation.longitude).subscribe((val:any) => {
        this.displayedRestaurant = val;
        this.displayedRestaurant.restaurant.images = new Map<string, Image>(Object.entries(this.displayedRestaurant.restaurant.images));
        this.checkIsContributor();
        setTimeout(() => this.createMap(), 100);
        this.isDone = true;
      });
    });
  }

  loadDataForUserOffline(id:any){
    this.location.getCurrentPosition()
    .then(coords => {
      this.api.getRestaurantById(id,coords.latitude, coords.longitude).subscribe((val:any) => {
        this.displayedRestaurant = val;
        this.displayedRestaurant.restaurant.images = new Map<string, Image>(Object.entries(this.displayedRestaurant.restaurant.images));
        this.checkIsContributor();
        setTimeout(() => this.createMap(), 100);
        this.isDone = true;
      });
    });
  }

  callRestaurant(){
    window.open(`tel:00237${this.displayedRestaurant.restaurant.phone}`)
  }

  async createMap() {
    const mapRef:any = document.getElementById('map');
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef,
      apiKey: apiKey,
      config: {
        center: {
          lat: this.displayedRestaurant.restaurant.localisation.latitude,
          lng: this.displayedRestaurant.restaurant.localisation.longitude,
        },
        zoom: 15,
      },
    });
    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: this.displayedRestaurant.restaurant.localisation.latitude,
        lng: this.displayedRestaurant.restaurant.localisation.longitude
      }
    });

  }

  openMealModal(){
    this.mealModal.present();
  }

  cancel(nameModal:string) {
    switch(nameModal){
      case 'meals': {
        this.modifyMealsModal.dismiss(null, 'cancel');
        break;
      }
      case 'images': {
        this.modifyImagesModal.dismiss(null, 'cancel');
        break;
      }
      case 'infos': {
        this.modifyInfosModal.dismiss(null, 'cancel');
        break;
      }
      case 'localisation': {
        this.modifyLocalisationModal.dismiss(null, 'cancel');
        break;
      }
      default: {
        this.mealModal.dismiss(null, 'cancel');
      }
    }
    
  }

  confirm() {
    this.mealModal.dismiss();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Action',
      buttons: [
        {
          text: 'Modifier les photos',
          icon: 'camera',
          handler: () => {
            this.modifyImagesModal.present();
          }
        },
        {
          text: 'Modifier les informations',
          icon: 'pencil',
          handler: () => {
            this.modifyInfosModal.present();
          }
        }, 
        {
          text: 'Modifier l\'emplacement',
          icon: 'location',
          handler: () => {
            this.modifyLocalisationModal.present();
          }
        }, 
        {
          text: 'Modifier le(s) repas',
          icon: 'fast-food',
          handler: () => {
            this.modifyMealsModal.present();
          }
        },
        {
          text: 'Annuler',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  onChangeLocalisation(address:any){
    this.displayedRestaurant.restaurant.localisation.latitude = address.latitude;
    this.displayedRestaurant.restaurant.localisation.longitude = address.longitude;
    this.displayedRestaurant.restaurant.localisation.country = address.country;
    this.displayedRestaurant.restaurant.localisation.city = address.city;
    this.displayedRestaurant.restaurant.localisation.area = address?.suburb || address.area;
    this.api.updateRestaurant(this.displayedRestaurant.restaurant).subscribe(val => {
      this.modifyLocalisationModal.dismiss();
      setTimeout(() => {
        this.isDone = false;
        this.ngOnInit();
      }, 100);
    });
  }

  onChangeInfos(form:any){
    this.displayedRestaurant.restaurant.name = form.name;
    this.displayedRestaurant.restaurant.phone = form.phone;
    this.displayedRestaurant.restaurant.categories = form.categories;
    this.api.updateRestaurant(this.displayedRestaurant.restaurant).subscribe(val => {
      this.modifyInfosModal.dismiss();
      setTimeout(() => {
        this.isDone = false;
        this.ngOnInit();
      }, 100);
    });
  }

  async onChangeImages(val:any){
    this.displayedRestaurant.restaurant.images = val.oldImages;
    const formData = new FormData();
    if(val.newImages.length != 0){
      for(let image of val.newImages){
        await this.file.createFile(image).then(file => {
          formData.append("images", file, image.filepath);
        });
      }
    }
    let restaurant:any = {...this.displayedRestaurant.restaurant}
    restaurant.images = Array.from(restaurant.images);
    formData.append("restaurant", JSON.stringify(restaurant));
    this.api.updateRestaurantWithFormData(formData, this.displayedRestaurant.restaurant._id).subscribe(val => {
      console.log('val :>> ', val);
      this.modifyImagesModal.dismiss();
      setTimeout(() => {
        this.isDone = false;
        this.ngOnInit();
      }, 100);
    });
  }
}
