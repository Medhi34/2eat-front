import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-slides-images',
  templateUrl: './slides-images.component.html',
  styleUrls: ['./slides-images.component.scss'],
})
export class SlidesImagesComponent  implements OnInit {

  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    // autoplay: true
  }
  constructor() { }

  ngOnInit() {}

}
