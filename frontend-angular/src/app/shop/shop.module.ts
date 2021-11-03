import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ProductFiltersComponent } from './product-filters.component';
import { ProductListResolver } from '../core/resolvers/product-list-resolver.service';
import { CategoryResolver } from '../core/resolvers/category.resolver';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ShopComponent,
    ProductFiltersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
  ],
  providers: [
    ProductListResolver,
    CategoryResolver
  ]
})
export class ShopModule { }
