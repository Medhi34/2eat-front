import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  isLoading: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    if(!form.valid) return;
    this.register(form);
  }

  register(form){
    this.isLoading = true;
    console.log(form.value);
  }

}
