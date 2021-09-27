import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShopResolverService } from './shop-resolver.service';

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
    ShopResolverService
  ]
})
export class ShopModule { }
