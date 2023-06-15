import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent  implements OnInit {

  @Output() onConfirm = new EventEmitter<string>();

  isLoading = false;
  form!:FormGroup;
  textLanguage!:any;

  constructor(private formBuilder: FormBuilder, private translate: TranslateService) { }

  ngOnInit() {
    this.translate.get('CHANGE_PASSWORD').subscribe((res) => this.textLanguage = res);
    this.form = this.formBuilder.group({
      oldPassword: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[0-9a-zA-Z_@/./$]{8,}")
      ])),
      newPassword: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[0-9a-zA-Z_@/./$]{8,}")
      ])),
      rewritedPassword: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[0-9a-zA-Z_@/./$]{8,}")
      ]))
    });
    this.form.addValidators(this.password(this.form));
  }

  password(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmpassword')?.value;
    return (): null | ValidationErrors => {
      if(password === confirmPassword){
        return null;
      }
      return { passwordMatch: false};
    } 
  }

  confirm(){
    this.isLoading = true;
    const password = this.form.get("newPassord")?.value;
    this.onConfirm.emit(password);
  }

}
