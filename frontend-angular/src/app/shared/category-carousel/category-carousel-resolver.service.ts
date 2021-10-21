import { map } from 'rxjs/operators';
import { CarouselItem } from './../carousel/carousel-item.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';

@Injectable()
export class CategoryCarouselResolver implements Resolve<CarouselItem[]> {

  constructor(
    private categoryService: CategoryService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CarouselItem[]> {
    return this.categoryService
        .list()
        .pipe(map(cats => cats.map(cat => <CarouselItem> {
          title: cat.shortName,
          slug: cat.slug
        })));
  }
}
