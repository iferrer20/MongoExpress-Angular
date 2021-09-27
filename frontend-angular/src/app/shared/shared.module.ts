import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesComponent } from './categories/categories.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductElementComponent } from './product-list/product-element.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CategoriesComponent,
    ProductListComponent,
    ProductElementComponent
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
