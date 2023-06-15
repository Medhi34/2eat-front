import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-change-profil',
  templateUrl: './change-profil.component.html',
  styleUrls: ['./change-profil.component.scss'],
})
export class ChangeProfilComponent  implements OnInit {

  @Input() imageUrl!:any;
  @Output() onConfirm = new EventEmitter<any>();

  isLoading = false;
  textLanguage!:any;

  constructor(public photoService:PhotoService, private translate:TranslateService) { }

  ngOnInit() {
    this.translate.get('CHANGE_PROFIL').subscribe((res) => this.textLanguage = res);
    this.photoService.photos = [];
  }

  async addPhotoToGallery() {
    this.photoService.photos = [];
    await this.photoService.addNewToGallery();
  }

  confirm(){
    this.isLoading = true;
    this.onConfirm.emit(this.photoService.photos[0]);
  }

}
