import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { catchError, of } from 'rxjs';
import { DisplayedRestaurant } from 'src/app/models/RestaurantDisplayed';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { GeolocalisationService } from 'src/app/services/geolocalisation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, ViewDidEnter, ViewWillLeave {

  @ViewChild(IonModal) modal!:IonModal;

  user!:User;
  isConnected:boolean = false;
  isNotDone:boolean = true;
  isOffline = false;
  displayedRestaurants:DisplayedRestaurant[] = [];

  constructor(private api:ApiService, private location:GeolocalisationService) { }

  ionViewWillLeave(): void {
    this.isNotDone = true;
    this.isConnected = false;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if(this.isNotDone){
      const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
      if(userToken != null){
        this.loadDataForUserConnected(userToken);
      }else{
        this.loadDataForUserNotConnected();
      }
    }
  }

  loadDataForUserConnected(userToken:any){
    this.api.getUserById(userToken.userId)
    .pipe(
      catchError((err:HttpErrorResponse) => {
        if(err.status == 400){
          this.checkConnectivity();
        }
        return of();
      })
    )
    .subscribe((val:any) => {
      this.user = val;
      this.isConnected = true;
      this.api.getAllRestaurants(this.user.localisation.latitude, this.user.localisation.longitude).subscribe((vals) => {
        this.displayedRestaurants = vals
        this.isNotDone = false;
      });
    });
  }

  loadDataForUserNotConnected(){
    this.location.getCurrentPosition()
    .then(coords => {
      this.api.getAllRestaurants(coords.latitude, coords.longitude)
      .pipe(
        catchError((err:HttpErrorResponse) => {
          if(err.status == 0){
            this.checkConnectivity();
          }
          return of();
        })
      )
      .subscribe((vals) => {
        this.displayedRestaurants = vals
        this.isNotDone = false;
      });
    })
    .catch(error => {
      if(error.code == 2){
        this.checkConnectivity();
      }
    });
  }

  checkConnectivity(){
    if(this.isNotDone && !this.isOffline){
      this.modal.present();
    }
  }

  onClickTry(val:any){
    if(this.modal.isCmpOpen){
      this.modal.dismiss();
    }
    this.isOffline = false;
    this.ionViewDidEnter();
  }

  closeModal(){
    this.isOffline = true;
    this.modal.dismiss();
  }
}
