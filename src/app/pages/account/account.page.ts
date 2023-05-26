import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleMap } from '@capacitor/google-maps';
import { User } from 'src/app/models/User';
import { apiKey } from 'src/app/models/url_api';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  user!:User;
  newMap!: GoogleMap;
  isDone:boolean = false;


  constructor(private formBuilder:FormBuilder, private api:ApiService) { }

  ngOnInit() {
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken != null){
      this.api.getUserById(userToken.userId).subscribe((val:any) => {
        this.user = val;
        setTimeout(() => {
          this.createMap();
        }, 200);
        this.isDone = true;
      })
    }
  }

  async createMap() {
    const mapRef:any = document.getElementById('map');
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef,
      apiKey: apiKey,
      config: {
        center: {
          lat: this.user.localisation.latitude,
          lng: this.user.localisation.longitude,
        },
        zoom: 15,
      },
    });
    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: this.user.localisation.latitude,
        lng: this.user.localisation.longitude
      }
    });

  }
  logout(){}

}
