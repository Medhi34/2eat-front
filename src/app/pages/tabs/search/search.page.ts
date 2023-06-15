import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, ViewWillEnter {

  @ViewChild(IonModal) modal!:IonModal;

  isConnected = false;
  isOffline = false;
  userId = "";

  selectedSegment!:string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken){
      this.userId = userToken.userId;
      this.isConnected = true;
    }
    this.selectedSegment = this.route.snapshot.paramMap.get('type') || 'Tous';
  }

  segmentChosen(name:string){
    this.selectedSegment = name;
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
