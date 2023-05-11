import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  constructor() { }

  ngOnInit() {
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
