import { ProductFilters, ProductList } from './../types/Product';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../types/Product';

@Injectable()
export class ProductListResolver implements Resolve<ProductList> {

  constructor(
    private productService: ProductService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductList> {
    const { text, category, author, order, quality } = route.queryParams;
    const filtersObj = <ProductFilters> {text, category, author, order, quality};
    Object.keys(filtersObj).forEach(prop => {
      if (filtersObj[prop] === undefined) {
        delete filtersObj[prop];
      }
    });

    return this.productService.list(filtersObj);
  }
}
