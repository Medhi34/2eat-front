import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, IonPopover } from '@ionic/angular';
import { Appreciation } from 'src/app/models/Appreciation';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-appreciation',
  templateUrl: './appreciation.component.html',
  styleUrls: ['./appreciation.component.scss'],
})
export class AppreciationComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonPopover) popover!: IonPopover;


  @Input() appreciation!:Appreciation;
  @Output("onChange") onChange = new EventEmitter<string>();

  canEdit:boolean = false;

  rate = 0;

  isLoading = false;
  commentForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, private alertController: AlertController, private api:ApiService) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: new FormControl(this.appreciation.review, Validators.required)
    })

    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken != null){
      if(this.appreciation.user._id == userToken.userId){
        this.canEdit = true;
      }
    }
  }

  openModal(){
    this.modal.present();
    this.popover.dismiss();
  }

  openPopover(){
    this.popover.present();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onClickRate(val:any){
    this.rate = val;
  }

  confirm() {
    this.isLoading = true;
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    this.appreciation.note = this.rate;
    this.appreciation.review = this.commentForm.value.comment;
    this.appreciation.date = new Date();
    this.appreciation.user = userToken.userId;

    this.api.updateComment(this.appreciation).subscribe(val => {
      this.isLoading = false;
      this.onChange.emit("updated");
    });
    this.modal.dismiss();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Attention',
      message: 'Vous êtes sur le point de supprimer votre commentaire !',
      buttons: [
        {
          text: "Continuer",
          role: "confirm",
          handler: () => {
            this.api.deleteComment(this.appreciation._id).subscribe(val => {
              this.onChange.emit("deleted");
              this.popover.dismiss();
            });
          }
        },
        {
          text: "Annuler",
          role: "cancel",
          handler: () => {this.popover.dismiss();}
        }
      ],
    });

    await alert.present();
  }

  onClickDelete(){
    this.presentAlert();
  }
}
