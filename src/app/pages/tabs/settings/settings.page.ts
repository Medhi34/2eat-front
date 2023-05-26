import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  isConnected:boolean = false;
  user!:User;
  textLanguage!:any;
  selectedLanguage!:string;
  alertButtons = [
    {
      text: 'Oui',
      role: 'confirm',
      handler: () => {
        this.logOut();
      }
    }, 
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => {
        console.log('Cancel');
      }
    }
  ];

  constructor(private translate: TranslateService, private router:Router, private api:ApiService) { }

  ngOnInit() {
    this.translate.get('SETTINGS').subscribe((res) => this.textLanguage = res);
    this.selectedLanguage = this.translate.currentLang.split('language ')[0];
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken != null){
      this.api.getUserById(userToken.userId).subscribe((val:any) => {
        this.user = val;
        this.isConnected = true;
      })
    }
  }

  toggleTheme(event:any){
    if(event.detail.checked){
      document.body.setAttribute('color-theme', 'dark');
    }else{
      document.body.setAttribute('color-theme', 'light');
    }
  }

  changeLanguage(event:any){
    this.translate.use(event.target.value);
    this.translate.get('SETTINGS').subscribe((res) => this.textLanguage = res);
  }

  logOut(){
    localStorage.removeItem("userToken");
    this.router.navigate(['/']);
  }

}
