import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Image } from 'src/app/models/Image';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
})
export class MealFormComponent  implements OnInit {

  @Input("meal")meal!:any;
  @Input("isMeal") isMeal = false;

  @Output("delete")onDelete = new EventEmitter<string>();

  textLanguage!:any

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.get('MEAL_FORM').subscribe((res) => this.textLanguage = res);
    if(this.isMeal){
      this.meal.images = new Map<string, Image>(Object.entries(this.meal.images));
    }
  }

  onClickDel(){
    this.onDelete.emit(this.meal._id);
  }
}
