import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ProductList } from '../types/Product';

@Injectable()
export class ProductListResolver implements Resolve<ProductList> {

  constructor(
    private productService: ProductService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductList> {
    return this.productService.list();
  }
}
