import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  type: boolean = true;
  isLogin = false; 
  
  constructor() { }

  ngOnInit() {
  }

  
  changeType(){
    this.type=!this.type;
  }


  OnSubmit(form: NgForm){
    console.log(form);
    if(!form.valid) return;
    this.login(form); 
  }

  login(form){
    this.isLogin = true ;
  }

  
}
