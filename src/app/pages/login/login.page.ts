import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { catchError, of } from 'rxjs';
import { Login } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  login!:Login;
  loginForm!:FormGroup;
  msgError = "";
  isLoading = false;
  textLanguage!:any


  constructor(private api:ApiService, private router:Router, private toastController: ToastController,
    private formBuilder:FormBuilder,
    private translate:TranslateService) { }

  ngOnInit() {
    this.translate.get('LOGIN').subscribe((res) => this.textLanguage = res);
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.required)
    });
  }

  onSignIn(){
    this.isLoading = true;
    this.login = {...this.loginForm.value};
    this.api.login(this.login).pipe(
      catchError(err => {
        this.msgError = "Email ou mot de passe incorrect";
        this.isLoading = false;
        return of();
      })
    )
    .subscribe((val:any) => {
      const userToken = val;
      localStorage.setItem('userToken', JSON.stringify(userToken));
      this.router.navigate(['/']);
    })
  }

  async signUp(bool:any){
    if(bool){
      this.modal.dismiss();
      this.presentToast();
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Vous avez maintenant un compte. Connectez-vous',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
