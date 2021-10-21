import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListResolver } from '../shared/product-list/product-list-resolver.service';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    resolve: {
      productList: ProductListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }