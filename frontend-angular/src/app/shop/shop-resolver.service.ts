import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../core/services/product.service';
import Product from '../core/types/Product';

@Injectable()
export class ShopResolverService implements Resolve<Product[]> {

  constructor(
    private productService: ProductService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.productService.list();
  }
}
