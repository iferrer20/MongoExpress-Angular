import { CarouselItem } from './../carousel/carousel-item.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.scss']
})
export class CategoryCarouselComponent implements OnInit {
  @Input() categories!: CarouselItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
