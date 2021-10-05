import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesComponent } from './categories/categories.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductElementComponent } from './product-list/product-element.component';
import { HttpClientModule } from '@angular/common/http';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    ProductListComponent,
    ProductElementComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CategoriesComponent,
    ProductListComponent
  ]
})
export class SharedModule { }
