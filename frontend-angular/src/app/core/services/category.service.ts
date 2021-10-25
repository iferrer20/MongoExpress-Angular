import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Category from '../types/Category';
import { ApiService, BodyData } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private api: ApiService) { }

  list(): Observable<Category[]> {
    return this.api.request<BodyData>('GET', 'category')
        .pipe(map(data => data.list));
  }

  get(slug: string): Observable<Category> {
    return this.api.request('GET', 'category/' + slug);
  }
  
}
