import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Meal } from 'src/app/models/Meal';
import { Restaurant } from 'src/app/models/Restaurant';
import { ApiService } from 'src/app/services/api.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-contributions-form',
  templateUrl: './contributions-form.page.html',
  styleUrls: ['./contributions-form.page.scss'],
})
export class ContributionsFormPage implements OnInit {

  restaurant:Restaurant = new Restaurant();
  resPictures:any[] = [];
  meals!:Meal[];

  pageShow:string = "start";
  isConnected:boolean = false;
  isNotDone = {
    step1: true,
    step2: true,
    step3: true,
    final: true
  }
  progress:number = 0;
  textLanguage!:any

  constructor(private file:FileService, private api:ApiService, private translate:TranslateService) { }

  ngOnInit() {
    this.translate.get('CONTRIBUTION_FORM').subscribe((res) => this.textLanguage = res);
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken != null){
      this.isConnected = true;
    }
    this.restaurant.user = userToken?.userId;
  }

  onStart(){
    this.pageShow = "part1";
    this.progress += .3;
  }

  async onStep1Finished(val:any){
    this.restaurant.name = val.name;
    this.restaurant.phone = val.phone;
    this.restaurant.localisation = {...val.localisation}
    this.pageShow = "part2";
    this.progress += .3;
  }

  onStep2Finished(val:any){
    this.restaurant.categories = val.categories;
    this.resPictures = val.images;
    this.pageShow = "part3";
    this.progress += .3;
  }

  async onStep3Finished(val:any){
    this.pageShow = "final";
    this.progress += .3;

    this.restaurant.date_save = new Date();
    const formData = new FormData();
    for(let image of this.resPictures){
      await this.file.createFile(image).then(file => {
        formData.append("images", file, image.filepath);
      });
    }
    formData.append("restaurant", JSON.stringify(this.restaurant));
    this.isNotDone.step1 = false;
    this.saveRestaurant(formData);
    await this.saveMeals(val);
    this.isNotDone.final = false;
    setTimeout(() =>{
      this.pageShow = "start"
      this.progress = 0;
    }, 5000);
  }

  previousPage(val:string){
    this.pageShow = val;
    if(this.progress < .3){
      this.progress = 0;
    }else{
      this.progress -= .3;
    }
  }

  saveRestaurant(formData:FormData){
    this.api.createRestaurant(formData).subscribe((id:any) => {
      this.restaurant._id = id;
    });
    this.isNotDone.step2 = false;
  }

  async saveMeals(vals:any){
    for(let meal of vals){
      const formData = new FormData();
      for(let image of meal.images){
        await this.file.createFile(image).then(file => {
          formData.append("images", file, image.filepath);
        });
      }
      meal.restaurant = this.restaurant._id;
      delete meal._id;
      formData.append("meal", JSON.stringify(meal));
      this.api.createMeal(formData, this.restaurant._id).subscribe(msg => console.log(msg));
    }
    this.isNotDone.step3 = false;
  }
}
