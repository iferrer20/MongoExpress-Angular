import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopResolverService } from './shop-resolver.service';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    resolve: {
      shop: ShopResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }