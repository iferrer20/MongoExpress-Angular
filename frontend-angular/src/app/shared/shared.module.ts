import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesComponent } from './categories/categories.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductElementComponent } from './product-list/product-element.component';
import { HttpClientModule } from '@angular/common/http';
import { SliderComponent } from './slider/slider.component';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    ProductListComponent,
    ProductElementComponent,
    SliderComponent,
    HeaderComponent,
    FooterComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CategoriesComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    SearchBarComponent
  ]
})
export class SharedModule { }
