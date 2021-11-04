import { ShopDetailsComponent } from './shop-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryResolver } from '../core/resolvers/category.resolver';
import { ProductListResolver } from '../core/resolvers/product-list.resolver';
import { ProductResolver } from '../core/resolvers/product.resolver';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    resolve: {
      categories: CategoryResolver,
      productList: ProductListResolver
    }
  },
  {
    path: 'view/:slug',
    component: ShopDetailsComponent,
    resolve: {
      product: ProductResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }