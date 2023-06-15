import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from 'src/app/models/Image';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-change-pictures',
  templateUrl: './change-pictures.component.html',
  styleUrls: ['./change-pictures.component.scss'],
})
export class ChangePicturesComponent  implements OnInit {

  @Output() onConfirm = new EventEmitter<any>();
  @Input() images!:Map<string, Image>;

  nbImages = 0;

  isLoading = false;

  constructor(public photoService:PhotoService) { }

  ngOnInit() {
    this.photoService.photos = [];
    this.nbImages = this.images.size;
  }

  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();
  }

  confirm(){
    this.isLoading = true;
    const images = {
      oldImages: this.images,
      newImages: this.photoService.photos
    }
    this.onConfirm.emit(images);
  }

  onDelete(item:any){
    item.value.isActive = false;
    this.images.set(item.key, item.value);
    this.nbImages--;
  }

  onDeletePhotos(){
    this.photoService.photos.shift();
  }
}
