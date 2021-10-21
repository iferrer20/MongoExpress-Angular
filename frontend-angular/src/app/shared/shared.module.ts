import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselComponent } from './carousel/carousel.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductElementComponent } from './product-list/product-element.component';
import { HttpClientModule } from '@angular/common/http';
import { SliderComponent } from './slider/slider.component';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CarouselItemComponent } from './carousel/carousel-item.component';
import { CategoryCarouselComponent } from './category-carousel/category-carousel.component';

@NgModule({
  declarations: [
    CarouselComponent,
    ProductListComponent,
    ProductElementComponent,
    SliderComponent,
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    CarouselItemComponent,
    CategoryCarouselComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CarouselComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    CategoryCarouselComponent
  ]
})
export class SharedModule { }
