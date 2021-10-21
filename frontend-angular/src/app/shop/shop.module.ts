import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductListResolver } from '../shared/product-list/product-list-resolver.service';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';

@NgModule({
  declarations: [
    ShopComponent
  ],
  imports: [
    SharedModule,
    ShopRoutingModule
  ],
  providers: [
    ProductListResolver
  ]
})
export class ShopModule { }
