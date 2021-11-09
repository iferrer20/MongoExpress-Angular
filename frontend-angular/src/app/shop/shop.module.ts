import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ProductFiltersComponent } from './product-filters.component';
import { ProductListResolver } from '../core/resolvers/product-list.resolver';
import { CategoryResolver } from '../core/resolvers/category.resolver';
import { CommonModule } from '@angular/common';
import { ShopDetailsComponent } from './shop-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShopComponent,
    ProductFiltersComponent,
    ShopDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    FormsModule
  ],
  providers: [
    ProductListResolver,
    CategoryResolver
  ],
  exports: [
  ]

})
export class ShopModule { }
