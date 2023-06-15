import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss'],
})
export class ChangeEmailComponent  implements OnInit {

  @Output() onConfirm = new EventEmitter<any>();
  @Input() user!:User;
  isLoading = false;
  form!: FormGroup;

  textLanguage!:any

  constructor(private formBuilder: FormBuilder, private translate:TranslateService) { }

  ngOnInit() {
    this.translate.get('CHANGE_INFOS').subscribe((res) => this.textLanguage = res);

    this.form = this.formBuilder.group({
      fullname: new FormControl(this.user.fullname, Validators.required),
      phone: new FormControl(this.user.phone, Validators.compose([
        Validators.required,
        Validators.pattern("6[597][0-9]{7}")
      ])),
      email: new FormControl(this.user.email, Validators.compose([
        Validators.required,
        Validators.email
      ]))
    });
  }

  confirm(){
    this.isLoading = true;
    const user = { ...this.form.value };
    this.onConfirm.emit(user);
  }

}
