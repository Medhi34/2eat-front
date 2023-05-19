import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { register } from 'swiper/element';
// register Swiper custom elements
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.setDefaultLang("fr");
    translate.use("fr");
  }
}
