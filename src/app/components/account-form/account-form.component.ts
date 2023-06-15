import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, of } from 'rxjs';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { FileService } from 'src/app/services/file.service';
import { GeolocalisationService } from 'src/app/services/geolocalisation.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent  implements OnInit {

  @Output() onConfirm = new EventEmitter<boolean>();

  registerForm!:FormGroup;
  isLoading = false;
  msgError = "";
  textLanguage!:any

  constructor(public photoService:PhotoService, private formBuilder:FormBuilder, private file:FileService, 
    private geolocation:GeolocalisationService, private api:ApiService, private translate:TranslateService) { }

  ngOnInit() {
    this.translate.get('ACCOUNT_FORM').subscribe((res) => this.textLanguage = res);
    this.registerForm = this.formBuilder.group({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("[0-9a-zA-Z_@/./$]{8,}")
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("6[597][0-9]{7}")
      ]))
    });
  }

  async confirm(){
    this.isLoading = true;
    await this.geolocation.getCurrentPosition()
    .then(async position => {
      await this.geolocation.reverseGeocode(position.latitude, position.longitude)
      .then(result => result.json())
      .then((data:any) => {
        const address = data.address;
        const user:User = {
          ...this.registerForm.value,
          localisation: {
            country: address.country,
            city: address.city,
            latitude: position.latitude,
            longitude: position.longitude,
            area: address?.suburb || data.display_name.split(",")[0]
          }
        }
        if(this.photoService.photos.length != 0){
          this.createUserWithProfil(user);
        }else{
          this.createSimpleUser(user);
        }
      })
    });
  }

  createSimpleUser(user:any){
    this.api.signUpUser(user)
    .pipe(
      catchError(err => {
        this.msgError = this.textLanguage.ERROR_MSG;
        this.isLoading = false;
        return of();
      })
    )
    .subscribe(val => {
      this.isLoading = false;
      this.onConfirm.emit(true);
    })
  }

  async createUserWithProfil(user:any){
    const formData = new FormData();
    await this.file.createFile(this.photoService.photos[0]).then(file => {
      formData.append("image", file, this.photoService.photos[0].filepath);
    });
    formData.append("user", JSON.stringify(user));
    this.api.signUp(formData)
    .pipe(
      catchError(err => {
        this.msgError = this.textLanguage.ERROR_MSG;
        this.isLoading = false;
        return of();
      })
    )
    .subscribe(val => {
      this.isLoading = false;
      this.onConfirm.emit(true);
    });
  }

  async addPhotoToGallery() {
    this.photoService.photos = [];
    await this.photoService.addNewToGallery();
  }

}
