import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../core/services/category.service';
import { CarouselItem } from '../shared/carousel/carousel-item.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carouselItems!: CarouselItem[];

  constructor(private route: ActivatedRoute, public catService: CategoryService) { }

  ngOnInit(): void {
    this.carouselItems = this.catService.categories.map(c => (<CarouselItem> {
      link: {url: ['/shop/'], query: {category: c.shortName}},
      title: c.description
    }));
  }
}
