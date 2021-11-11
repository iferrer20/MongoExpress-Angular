import { ShopDetailsComponent } from './details/shop-details.component';
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
    data: {
      title: 'Shop'
    },
    resolve: {
      categories: CategoryResolver,
      productList: ProductListResolver
    }
  },
  {
    path: 'view/:slug',
    component: ShopDetailsComponent,
    data: {
      title: 'Product details - Shop'
    },
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
