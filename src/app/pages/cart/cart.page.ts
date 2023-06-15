import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { catchError, of } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, ViewWillEnter {

  @ViewChild(IonModal) modal!:IonModal;
  total!:number;

  isDone = false;
  isOffline = false;
  priceOrders = new Map<string, number>();
  orders:Order[] = [];
  results:Order[] = [];
  textLanguage!:any;

  constructor(private api:ApiService, private translate:TranslateService) { }

  ionViewWillEnter(): void {
    this.loadData();
  }

  ngOnInit() {
    this.translate.get('CART').subscribe((res) => this.textLanguage = res);
  }

  loadData(){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken){
      this.api.getOrders(userToken.userId)
      .pipe(
        catchError((err:HttpErrorResponse) => {
          if(err.status == 0){
            this.checkConnectivity();
          }
          return of();
        })
      )
      .subscribe((vals:any) => {
        this.orders = vals;
        this.results = vals;
        this.isDone = true;
        setTimeout(() => {
          this.updateTotal();
        }, 200);
      })
    }
  }

  handleInput(event:any){
    const query = event.target.value.toLowerCase();
    this.results = this.orders.filter((d) => d.meal.name.toLowerCase().indexOf(query) > -1);
  }

  updateTotal(){
    this.total = 0;
    for(let value of this.priceOrders.values()){
      this.total += value;
    }
  }

  onPriceUpdated(item:any){
    this.priceOrders.set(item.key, item.value);
    if(item.event == "click"){
      this.updateTotal();
    }
  }

  onDeleteOrder(val:any){
    this.loadData();
  }

  checkConnectivity(){
    if(!this.isDone && !this.isOffline){
      this.modal.present();
    }
  }

  onClickTry(val:any){
    if(this.modal.isCmpOpen){
      this.modal.dismiss();
    }
    this.isOffline = false;
    this.ionViewWillEnter();
  }

  closeModal(){
    this.isOffline = true;
    this.modal.dismiss();
  }
}
