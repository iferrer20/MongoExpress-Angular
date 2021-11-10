import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ProductFiltersComponent } from './product-filters.component';
import { ProductListResolver } from '../core/resolvers/product-list.resolver';
import { CategoryResolver } from '../core/resolvers/category.resolver';
import { CommonModule } from '@angular/common';
import { ShopDetailsComponent } from './details/shop-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsCommentsComponent } from './details/details-comments.component';

@NgModule({
  declarations: [
    ShopComponent,
    ProductFiltersComponent,
    ShopDetailsComponent,
    DetailsCommentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductListResolver,
    CategoryResolver
  ],
  exports: [
  ]

})
export class ShopModule { }
