import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CategoryService } from '../core/services/category.service';
import { orders, ProductFilters, qualities } from '../core/types/Product';
import { skip, tap } from 'rxjs/operators';

@Component({
  selector: 'shop-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnInit {
  
  qualities = qualities;
  orders = orders;
  
  filters: ProductFilters = <ProductFilters> {};
  @Output('onFilter') eventFilters = new EventEmitter<ProductFilters>();
  
  constructor(
    public catService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  changeCategory(s: string) {
    this.setFilter('category', s);
  }

  changeQuality(s: string) {
    this.setFilter('quality', s);
  }
  
  changeOrder(s: string) {
    this.setFilter('order', s);
  }

  unsetCategory() {
    this.setFilter('category', null);
  }

  setFilter(name: string, value: string | null) {
    this.filters.page = 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {[name]: value || null, page: 1},
      queryParamsHandling: 'merge'
    });
  }

  emitFilters() {
    for (const p in this.filters) {
      if (!this.filters[p]) {
        delete this.filters[p];
      }
    }

    this.eventFilters.emit(this.filters);
  }

  ngOnInit(): void {
    this.route.queryParams
    .pipe(
      tap(({text, category, author, order, quality, page}) => {
        this.filters = {text, category, author, order, quality, page}
      }))
      //skip(1))
    .subscribe(() => {
      this.emitFilters();
    });
  }

}
