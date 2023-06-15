import { Component, OnInit } from '@angular/core';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DisplayedRestaurant } from 'src/app/models/RestaurantDisplayed';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.page.html',
  styleUrls: ['./contributions.page.scss'],
})
export class ContributionsPage implements OnInit, ViewWillEnter, ViewWillLeave {

  isDone = false;
  userId = "";
  contributions:DisplayedRestaurant[] = [];
  results:DisplayedRestaurant[] = [];
  textLanguage!:any;

  constructor(private api:ApiService, private translate:TranslateService) { }

  ionViewWillEnter(): void {
    this.loadData();
  }
  ionViewWillLeave(): void {
    this.isDone = false;
  }

  ngOnInit() {
    this.translate.get('CONTRIBUTION').subscribe((res) => this.textLanguage = res);
  }

  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    this.results = this.contributions.filter((d) => d.restaurant.name.toLowerCase().indexOf(query) > -1);
  }

  loadData(){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken){
      this.userId = userToken.userId;
      this.api.getUserContributions(userToken.userId).subscribe((vals:any) => {
        this.contributions = vals;
        this.results = this.contributions;
        this.isDone = true;
      });
    }
  }

}
