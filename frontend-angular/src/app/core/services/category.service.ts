import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Category } from '../types/Category';
import { ApiService, BodyData } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories!: Category[]; // Cached categories

  constructor(private api: ApiService) {
  }

  list(): Observable<Category[]> {
    if (this.categories) return of(this.categories);
    return this.api.request<BodyData>('GET', 'category')
        .pipe(
          map(data => data.list),
          tap((c: Category[]) => this.categories = c)
        );
  }

  get(slug: string): Observable<Category> {
    return this.api.request('GET', 'category/' + slug);
  }

  getCategoryPretty(category: Category): string {
    return category.shortName.replace(/(^.)|(?<=\-)./g, (a) => a.toUpperCase()).replace(/\-/g, ' ');
  }
  
}
