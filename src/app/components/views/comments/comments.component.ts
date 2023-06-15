import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  commentForm!:FormGroup;
  rate:number = 0;

  isDone:boolean = false;
  isLoading:boolean = false;

  appreciations!:Appreciation[];
  appreciation = new Appreciation();

  constructor(private api:ApiService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.loadData();
    this.commentForm = this.formBuilder.group({
      comment: new FormControl("", Validators.required)
    })
  }

  loadData(){
    this.api.getRestaurantAppreciations(this.idRestaurant).subscribe((vals:any) => {
      this.appreciations = vals;
      this.appreciations = this.appreciations.sort((a, b) => {
        return  Date.parse(b.date.toString()) -  Date.parse(a.date.toString());
      })
      this.isDone = true;
    })
  }

  onClickRate(val:any){
    this.rate = val;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }


  onChange(val:any){
    this.loadData();
  }

  confirm() {
    this.isLoading = true;
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    this.appreciation.note = this.rate;
    this.rate = 0;
    this.appreciation.restaurant = this.idRestaurant;
    this.appreciation.review = this.commentForm.value.comment;
    this.appreciation.date = new Date();
    this.appreciation.user = userToken.userId;

    this.api.saveComment(this.appreciation).subscribe(val => {
      this.isLoading = false;
      this.commentForm.get("comment")?.setValue("");
    });
    this.modal.dismiss();
    setTimeout(() => {this.loadData()}, 100);
  }

}
