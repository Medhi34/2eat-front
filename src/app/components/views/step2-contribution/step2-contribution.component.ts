import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-step2-contribution',
  templateUrl: './step2-contribution.component.html',
  styleUrls: ['./step2-contribution.component.scss'],
})
export class Step2ContributionComponent  implements OnInit {

  isLoading:boolean = false;

  step2Form!:FormGroup;

  @Output("previous") previousClicked = new EventEmitter<string>();
  @Output("next") nextClicked = new EventEmitter<any>();

  textLanguage!:any

  constructor(public photoService:PhotoService, private formBuilder:FormBuilder, private translate: TranslateService) { }

  ngOnInit() {
    this.translate.get('STEP2_CONTRIBUTION').subscribe((res) => this.textLanguage = res);
    this.step2Form = this.formBuilder.group({
      categories: new FormControl(Validators.required)
    })
  }

  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();
  }

  onClickPrevious(page:string){
    this.previousClicked.emit(page);
  }

  onClickNext(){
    this.isLoading = true;
    const resp = {...this.step2Form.value};
    resp.images = this.photoService.photos;
    this.nextClicked.emit(resp);
    this.photoService.photos = [];
    this.isLoading = false;
  }

}
