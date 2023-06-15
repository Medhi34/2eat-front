import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonToggle, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, ViewWillEnter, ViewWillLeave {

  isConnected = false;
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
  theme = window.matchMedia('(prefers-color-scheme: dark)');
  @ViewChild(IonToggle) toggle!:IonToggle;

  constructor(private translate: TranslateService, private router:Router, private api:ApiService) { }

  ionViewWillLeave(): void {
    this.isConnected = false;
  }

  ionViewWillEnter(): void {
    this.loadData();
  }

  ngOnInit() {
    this.translate.get('SETTINGS').subscribe((res) => this.textLanguage = res);
    this.selectedLanguage = this.translate.currentLang.split('language ')[0];
  }

  loadData(){
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken){
      this.api.getUserById(userToken.userId).subscribe((val:any) => {
        this.user = val;
        this.isConnected = true;
      })
    }
    this.theme.addEventListener('change', (ev) => {this.checkToggle(ev.matches)});
    this.checkToggle(this.theme.matches);
  }

  toggleTheme(){
    if(this.toggle.checked){
      document.body.setAttribute('color-theme', 'dark');
    }else{
      document.body.setAttribute('color-theme', 'light');
    }
  }

  checkToggle(resp:boolean){
    this.toggle.checked = resp;
    this.toggleTheme();
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
