import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { catchError, of } from 'rxjs';
import { Login, User, UserToken } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { FileService } from 'src/app/services/file.service';
import { GeolocalisationService } from 'src/app/services/geolocalisation.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  login!:Login;
  msgError:string = "";
  error:string = "";
  userToken!:UserToken;
  loginForm!:FormGroup;
  registerForm!:FormGroup;
  hasLoadPicture:boolean = false;
  isSubmitedLogin:boolean = false;
  isSubmitedRegister:boolean = false;


  constructor(public photoService:PhotoService, private api:ApiService, public formBuilder:FormBuilder, private router:Router, 
    private file:FileService,
    private geolocation:GeolocalisationService) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.required)
    });

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

  onSignIn(){
    this.isSubmitedLogin = true;
    console.log(this.loginForm.value);
    this.login = {...this.loginForm.value};
    this.api.login(this.login).pipe(
      catchError(err => {
        this.msgError = "Email ou mot de passe incorrect";
        this.isSubmitedLogin = false;
        return of();
      })
    )
    .subscribe((val:any) => {
      this.userToken = val;
      localStorage.setItem('userToken', JSON.stringify(this.userToken));
      console.log(this.userToken);
      this.router.navigate(['tabs']);
      this.isSubmitedLogin = false;
    })
  }

  async onSignUp(){
    this.isSubmitedRegister = true;
    if(this.photoService.photos[0] != null){
      this.signUpWithFormData();
    }else{
      await this.geolocation.getCurrentPosition().then(async position => {
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
              longitude: position.longitude
          }};
          this.api.signUpUser(user)
          .pipe(
            catchError(err => {
              this.error = "Email déjà existant !";
              this.isSubmitedRegister = false;
              return of();
            })
          )
          .subscribe(val => {
            console.log(val)
            this.isSubmitedRegister = false;
          })
        })
      });
    }
  }

  async signUpWithFormData(){
    const formData = new FormData();
    await this.file.createFile(this.photoService.photos[0]).then(file => {
      formData.append("image", file, this.photoService.photos[0].filepath);
    });
    await this.geolocation.getCurrentPosition().then(async position => {
      await this.geolocation.reverseGeocode(position.latitude, position.longitude)
      .then(result => result.json())
      .then((data:any) => {
        const address = data.address;
        const user:User = {
          ...this.registerForm.value,
          localisation: {
            country: address.country,
            city: address.city,
            area: address.suburb,
            latitude: position.latitude,
            longitude: position.longitude
        }};
        formData.append("user", JSON.stringify(user));
      })
    });

    this.api.signUp(formData)
    .pipe(
      catchError(err => {
        // this.msgError = "Email déjà existant !";
        this.isSubmitedLogin = false;
        return of();
      })
    )
    .subscribe(val => {
      console.log(val);
      this.isSubmitedRegister = false;
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss();
  }

  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();
    this.hasLoadPicture = true;
  }
}
