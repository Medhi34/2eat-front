import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit, ViewWillEnter {

  @ViewChild(IonModal) modal!:IonModal;

  isConnected = false;
  isOffline = false;
  userId = "";

  constructor() { }

  ionViewWillEnter(): void {
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken){
      this.userId = userToken.userId;
      this.isConnected = true;
    }
  }

  ngOnInit() {
  }

  checkConnectivity(isDone:any){
    if(!isDone && !this.isOffline){
      this.modal.present();
    }
  }

  onClickTry(val:any){
    window.location.reload();
  }

  closeModal(){
    this.isOffline = true;
    this.modal.dismiss();
  }

}
