import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Category from '../types/Category';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private api: ApiService) { }

  list(): Observable<Category[]> {
    return this.api.request('GET', 'category');
  }

  get(slug: string): Observable<Category> {
    return this.api.request('GET', 'category/' + slug);
  }
  
}
