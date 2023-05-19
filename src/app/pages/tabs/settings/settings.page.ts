import { Component, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  textLanguage!:any;
  selectedLanguage!:string

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.get('SETTINGS').subscribe((res) => this.textLanguage = res);
    this.selectedLanguage = this.translate.currentLang.split('language ')[0];
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

}
