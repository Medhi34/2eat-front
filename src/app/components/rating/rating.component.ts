import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { COLORS, POSITION } from 'src/app/models/RestaurantDisplayed';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent  implements OnInit {

  @Input("rating") rating!:number;
  @Input("size") size!:number;
  @Input("position") position = "end";
  @Input("fixed") fixed = false;
  @Output() ratingChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {

    switch(this.position){
      case "center":
        this.position = POSITION.CENTER;
        break;
      case "start":
        this.position = POSITION.START;
        break;
      case "evenly":
        this.position = POSITION.EVENLY;
        break;
      default:
        this.position = POSITION.END;
    }
  }

  rate(index:number){
    if(!this.fixed){
      this.rating = index;
      this.ratingChange.emit(this.rating);
    }
  }

  getColor(index:number): string {
    if(this.isAboverating(index)){
      return COLORS.GRAY;
    }
    switch(this.rating){
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return COLORS.YELLOW;
      default:
        return COLORS.GRAY;
    }
  }

  isAboverating(index:number): boolean{
    return index > this.rating;
  }

}
