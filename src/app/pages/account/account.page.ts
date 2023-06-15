import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { AlertController, IonModal, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { catchError, of } from 'rxjs';
import { User } from 'src/app/models/User';
import { apiKey } from 'src/app/models/url_api';
import { ApiService } from 'src/app/services/api.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, ViewWillEnter, ViewWillLeave {

  @ViewChild("offlineModal") modal!:IonModal;
  @ViewChild("modifyPositionModal") modifyPositionModal!:IonModal;
  @ViewChild("modifyEmailModal") modifyEmailModal!:IonModal;
  @ViewChild("modifyPasswordModal") modifyPasswordModal!:IonModal;
  @ViewChild("modifyProfilModal") modifyProfilModal!:IonModal;

  isOffline = false;
  user!:User;
  newMap!: GoogleMap;
  isDone:boolean = false;
  textLanguage!:any;


  constructor(private formBuilder:FormBuilder, private api:ApiService, private file:FileService, 
    private alertController: AlertController, private router:Router, private translate: TranslateService) { }

  ionViewWillEnter(): void {
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken){
      this.loadData(userToken);
    }
  }

  ionViewWillLeave(): void {
    this.isDone = false;
  }

  ngOnInit() {
    this.translate.get('ACCOUNT').subscribe((res) => this.textLanguage = res);
  }

  loadData(userToken:any){
    this.api.getUserById(userToken.userId)
    .pipe(
      catchError((err:HttpErrorResponse) => {
        if(err.status == 0){
          this.checkConnectivity();
        }
        return of();
      })
    )
    .subscribe((val:any) => {
      this.user = val;
      if(this.user.imageUrl == ''){
        this.user.imageUrl = '/assets/img/user-profile.png';
      }
      setTimeout(() => {
        this.createMap();
      }, 100);
      this.isDone = true;
    });
  }

  async createMap() {
    const mapRef:any = document.getElementById('map');
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef,
      apiKey: apiKey,
      config: {
        center: {
          lat: this.user.localisation.latitude,
          lng: this.user.localisation.longitude,
        },
        zoom: 15,
      },
    });
    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: this.user.localisation.latitude,
        lng: this.user.localisation.longitude
      }
    });
  }

  checkConnectivity(){
    if(!this.isDone && !this.isOffline){
      this.modal.present();
    }
  }

  onClickTry(val:any){
    if(this.modal.isCmpOpen){
      this.modal.dismiss();
    }
    this.isOffline = false;
    this.ionViewWillEnter();
  }

  closeModal(){
    this.isOffline = true;
    this.modal.dismiss();
  }

  presentModal(modal:string) {
    switch(modal){
      case 'profil': {
        this.modifyProfilModal.present();
        break;
      }
      case 'password': {
        this.modifyPasswordModal.present();
        break;
      }
      case 'email': {
        this.modifyEmailModal.present();
        break;
      }
      default: {
        this.modifyPositionModal.present();
      }
    }
  }

  cancel(modal:string) {
    switch(modal){
      case 'profil': {
        this.modifyProfilModal.dismiss(null, 'cancel');
        break;
      }
      case 'password': {
        this.modifyPasswordModal.dismiss(null, 'cancel');
        break;
      }
      case 'email': {
        this.modifyEmailModal.dismiss(null, 'cancel');
        break;
      }
      default: {
        this.modifyPositionModal.dismiss(null, 'cancel');
      }
    }
  }

  onChangeLocalisation(address:any){
    this.user.localisation.latitude = address.latitude;
    this.user.localisation.longitude = address.longitude;
    this.user.localisation.country = address.country;
    this.user.localisation.city = address.city;
    this.user.localisation.area = address?.suburb || address.area;
    this.api.updateUser(this.user).subscribe( msg => {
      console.log('msg :>> ', msg);
      this.modifyPositionModal.dismiss();
      this.isDone = false;
      setTimeout(() => {
        this.ionViewWillEnter();
      }, 200);
    })
  }

  onChangePassword(password:any){
    this.user.password = password;
    this.api.updateUser(this.user).subscribe( msg => {
      console.log('msg :>> ', msg);
      this.modifyPasswordModal.dismiss();
      this.isDone = false;
      setTimeout(() => {
        this.ionViewWillEnter();
      }, 200);
    });
  }

  onChangeInfos(userForm:any){
    this.user.fullname = userForm.fullname;
    this.user.phone = userForm.phone;
    this.user.email = userForm.email;
    this.api.updateUser(this.user).subscribe( msg => {
      console.log('msg :>> ', msg);
      this.modifyEmailModal.dismiss();
      this.isDone = false;
      setTimeout(() => {
        this.ionViewWillEnter();
      }, 200);
    });
  }

  async onChangeProfil(image:any){
    const formData = new FormData();
    await this.file.createFile(image).then(file => {
      formData.append("image", file, image.filepath);
    });
    formData.append("user", JSON.stringify(this.user));

    this.api.updateUserWithFormData(formData, this.user._id).subscribe(msg => {
      console.log('msg :>> ', msg);
      this.modifyProfilModal.dismiss();
      this.isDone = false;
      setTimeout(() => {
        this.ionViewWillEnter();
      }, 200);
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Attention',
      message: 'Vous êtes sur le point de supprimer votre compte.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmer',
          handler: () => {
            localStorage.removeItem("userToken");
            this.api.deleteUser(this.user._id).subscribe(msg => {
              console.log('msg :>> ', msg);
              this.router.navigate(['/']);
            })
          }
        }
      ]
    });
  
    await alert.present();
  }

}
