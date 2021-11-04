import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from '../core/services/category.service';
import { orders, ProductFilters, qualities } from '../core/types/Product';

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

  changeCategory(s: string) {
    this.filters.category = s;
    this.emitFilters();
  }

  changeQuality(s: string) {
    this.filters.quality = s;
    this.emitFilters();
  }
  changeOrder(s: string) {
    console.log(s)
    this.filters.order = s;
    this.emitFilters();
  }

  unsetCategory() {
    this.filters.category = '';
    this.emitFilters();
  }

  emitFilters() {
    this.eventFilters.emit(this.filters);
  }

  constructor(public catService: CategoryService) { }

  ngOnInit(): void {
    
  }

}
