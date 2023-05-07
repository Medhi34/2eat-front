import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.page.html',
  styleUrls: ['./add-menu-item.page.scss'],
})
export class AddMenuItemPage implements OnInit {

   isLoading: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
