import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Product from '../types/Product';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api: ApiService) { }

  list(): Observable<Product[]> {
    return this.api.request('GET', 'product');
  }

  get(slug: string): Observable<Product> {
    return this.api.request('GET', 'product/' + slug);
  }

  
}
