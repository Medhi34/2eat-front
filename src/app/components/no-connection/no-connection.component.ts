import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-no-connection',
  templateUrl: './no-connection.component.html',
  styleUrls: ['./no-connection.component.scss'],
})
export class NoConnectionComponent  implements OnInit {

  @Output() onClickTry = new EventEmitter<string>();

  textLanguage!:any;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.get('NO_CONNECT').subscribe((res) => this.textLanguage = res);
  }

  onClick(){
    this.onClickTry.emit("retry");
  }

}
