import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart-buttons',
  templateUrl: './cart-buttons.component.html',
  styleUrls: ['./cart-buttons.component.scss'],
})
export class CartButtonsComponent  implements OnInit {

  @Input() userId!:string;

  quantity = 0;

  constructor(private api:ApiService) { }

  ngOnInit() {
    if(this.userId){
      this.loadData();
    }
  }

  loadData(){
    this.api.getOrders(this.userId).subscribe((vals:any) => this.quantity = vals.length);
  }

}
