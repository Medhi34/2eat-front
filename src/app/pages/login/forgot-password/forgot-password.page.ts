import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  isLoading = false;

  constructor() { }

  ngOnInit() {
  }
  onSubmit(form: NgForm){
    console.log(form.value);
  }
}
