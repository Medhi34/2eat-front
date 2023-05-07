import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.page.html',
  styleUrls: ['./add-restaurant.page.scss'],
})
export class AddRestaurantPage implements OnInit {
   isLoading: boolean = false;

  constructor() { }

  ngOnInit() {
  }
   onSubmit(form: NgForm){
    if(!form.valid) return;
  }



}
