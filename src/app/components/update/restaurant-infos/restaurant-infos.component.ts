import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from 'src/app/models/Restaurant';

@Component({
  selector: 'app-restaurant-infos',
  templateUrl: './restaurant-infos.component.html',
  styleUrls: ['./restaurant-infos.component.scss'],
})
export class RestaurantInfosComponent  implements OnInit {

  @Output() onConfirm = new EventEmitter<any>();
  @Input() restaurant!:Restaurant;

  isLoading = false;
  restaurantForm!:FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.restaurantForm = this.formBuilder.group({
      name: new FormControl(this.restaurant.name, Validators.required),
      phone: new FormControl(this.restaurant.phone, Validators.compose([
        Validators.required,
        Validators.pattern("6[579][0-9]{7}")
      ])),
      categories: new FormControl(this.restaurant.categories, Validators.required)
    })
  }

  onSubmit(){
    this.isLoading = true;
    this.onConfirm.emit(this.restaurantForm.value);
  }

}
