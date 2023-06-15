import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-step3-contribution',
  templateUrl: './step3-contribution.component.html',
  styleUrls: ['./step3-contribution.component.scss'],
})
export class Step3ContributionComponent  implements OnInit {

  @ViewChild(IonModal) modal!:IonModal;

  isLoading:boolean = false;

  meals:Map<string, any> = new Map();
  number = 0;
  mealForm!:FormGroup;
  textLanguage!:any

  @Output("previous") previousClicked = new EventEmitter<string>();
  @Output("next") nextClicked = new EventEmitter<any>();

  constructor(public photoService:PhotoService, private formBuilder:FormBuilder, private translate: TranslateService) { }

  ngOnInit() {
    this.translate.get('STEP3_CONTRIBUTION').subscribe((res) => this.textLanguage = res);
    this.mealForm = this.formBuilder.group({
      name: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      accompagnements: new FormControl("")
    })
    this.photoService.photos = [];
  }

  async addMealPhotoToGallery() {
    await this.photoService.addNewToGallery();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const meal = {...this.mealForm.value}
    meal.accompagnements = meal.accompagnements.replaceAll("\n", "").split(",").map((item: any) => item.trim());
    meal.images = this.photoService.photos;
    this.photoService.photos = [];
    meal._id = meal.name + this.number;
    this.meals.set(meal._id, meal);
    this.modal.dismiss();
  }

  onDeleted(id:any){
    try {
      this.meals.delete(id);
    } catch (error) {
      console.log(error);
    }
  }

  onClickPrevious(page:string){
    this.previousClicked.emit(page);
  }

  onClickNext(){
    this.isLoading = true;
    this.nextClicked.emit(Array.from(this.meals.values()));
    this.isLoading = false;
  }
}
