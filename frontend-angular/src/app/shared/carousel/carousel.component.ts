import { Component, Input, OnInit } from '@angular/core';
import { CarouselItem } from './carousel-item.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() items!: CarouselItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
