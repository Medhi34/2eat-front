import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from 'src/app/models/Image';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent  implements OnInit {

  @Input("restaurant") restaurant!:any;
  @Input("distance") distance!:number;
  @Input("rate") rate!:number;
  @Input("contributorId") contributorId!:string;

  imageUrl = "";

  constructor(private router:Router) { }

  ngOnInit() {
    this.restaurant.images = new Map<string, Image>(Object.entries(this.restaurant.images)); 
  }

  onClick(){
    if(this.contributorId){
      this.router.navigate(['/restaurant-details', this.restaurant._id, this.contributorId]);
    }else{
      this.router.navigate(['/restaurant-details', this.restaurant._id]);
    }
  }
}
