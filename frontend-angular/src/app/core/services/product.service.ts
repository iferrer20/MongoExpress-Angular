import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product, ProductFilters, ProductList } from '../types/Product';
import { UserComment } from '../types/User';
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

  like(product: Product) {
    return this.api.request('POST', 'product/like/' + product.slug).pipe(
      tap(() => {
        if (!product.isFavorited) {
          product.likes++;
          product.isFavorited = true;
        } else {
          product.likes--;
          product.isFavorited = false;
        }
      })
    );
  }

  rate(product: Product, value: number) {
    return this.api.request('POST', 'product/rate/' + product.slug, {value}).pipe(
      tap(() => {
        product.userRating = value;
      })
    );
  }

  get(slug: string): Observable<Product> {
    return this.api.request('GET', 'product/' + slug);
  }

  post(product: any) {
    const postData = new FormData();
    postData.append('name', product.name);
    postData.append('category', product.category);
    postData.append('description', product.description);
    postData.append('quality', product.quality);
    postData.append('state', product.state);
    postData.append('image', product.image);
    return this.api.request('POST', 'product/', postData);
  }
  
  comment(product: Product, comment: UserComment): Observable<UserComment> {
    return this.api.request('POST', 'product/comment/' + product.slug, comment);
  }
  removeComment(product: Product, comment: UserComment) {
    return this.api.request('DELETE', 'product/comment/' + product.slug + '/' + comment.id);
  }
  
}
