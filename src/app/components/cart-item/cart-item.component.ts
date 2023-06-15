import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Image } from 'src/app/models/Image';
import { Order } from 'src/app/models/Order';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent  implements OnInit {

  @Input() order!:Order;
  @Output() onPriceUpdated = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<string>();

  price!:number;
  textLanguage!:any

  constructor(private api:ApiService, private alertController: AlertController, private translate:TranslateService) { }

  ngOnInit() {
    this.translate.get('CART_ITEM').subscribe((res) => this.textLanguage = res);
    this.order.meal.images = new Map<string, Image>(Object.entries(this.order.meal.images));
    this.updatePrice("");
  }

  updatePrice(event:string){
    this.price = this.order.meal.price * this.order.quantity;
    const item = {
      key: this.order._id,
      value: this.price,
      event: event
    }
    this.onPriceUpdated.emit(item);
  }

  addQuantity(){
    this.order.quantity+=1;
    this.updatePrice("click");
  }

  removeQuantity(){
    if(this.order.quantity > 1){
      this.order.quantity-=1;
      this.updatePrice("click");
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Attention',
      message: 'Vous êtes sur le point de supprimer votre commande !',
      buttons: [
        {
          text: "Continuer",
          role: "confirm",
          handler: () => {
            this.api.deleteOrder(this.order._id).subscribe(val => {
              this.onDelete.emit("deleted");
            });
          }
        },
        {
          text: "Annuler",
          role: "cancel",
          handler: () => {}
        }
      ],
    });

    await alert.present();
  }

  onClickDelete(){
    this.presentAlert();
  }

}
