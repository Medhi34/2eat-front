import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Appreciation } from 'src/app/models/Appreciation';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  @Input() idRestaurant!:string;
  isDone:boolean = false;
  appreciations!:Appreciation[];

  constructor(private api:ApiService) { }

  ngOnInit() {
    this.api.getRestaurantAppreciations(this.idRestaurant).subscribe((vals:any) => {
      this.appreciations = vals;
      this.isDone = true;
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss();
  }

  onWillDismiss(event: Event) {
    // const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // if (ev.detail.role === 'confirm') {
    //   this.message = `Hello, ${ev.detail.data}!`;
    // }
  }

}
