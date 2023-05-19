import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Appreciation } from 'src/app/models/Appreciation';

@Component({
  selector: 'app-appreciation',
  templateUrl: './appreciation.component.html',
  styleUrls: ['./appreciation.component.scss'],
})
export class AppreciationComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  @Input() appreciation!:Appreciation;

  constructor() { }

  ngOnInit() {}

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
