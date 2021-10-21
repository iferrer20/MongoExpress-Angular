import { CarouselItem } from './../shared/carousel/carousel-item.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories!: CarouselItem[];
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories = this.route.snapshot.data.categoryList;
  }
}
