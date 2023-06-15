import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ViewWillEnter } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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
  textLanguage!:any;

  constructor(private translate: TranslateService) { }

  ionViewWillEnter(): void {
    this.translate.get('FAVOURITE').subscribe((res) => this.textLanguage = res);
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
