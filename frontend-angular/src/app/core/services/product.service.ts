import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product, ProductFilters, ProductList } from '../types/Product';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList!: ProductList;

  constructor(private api: ApiService) { }

  list(filters?: ProductFilters): Observable<ProductList> {
    return this.api.request<ProductList>('GET', 'product', filters).pipe(
      tap((pl: ProductList) => this.productList = pl)
    );
  }

  get(slug: string): Observable<Product> {
    return this.api.request('GET', 'product/' + slug);
  }
  
}
