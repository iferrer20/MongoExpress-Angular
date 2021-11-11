import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { CreateProductComponent } from './modal/modals/create-product.component';
import { ProductFavComponent } from './product-fav/product-fav.component';
import { ProductRateComponent } from './product-rate/product-rate.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { UserLinkComponent } from './user-link/user-link.component';

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
    ModalComponent,
    CreateProductComponent,
    ProductFavComponent,
    ProductRateComponent,
    CommentListComponent,
    UserLinkComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    CarouselComponent,
    CreateProductComponent,
    ModalComponent,
    ProductFavComponent,
    ProductRateComponent,
    CommentListComponent,
    UserLinkComponent
  ]
})
export class SharedModule { }
