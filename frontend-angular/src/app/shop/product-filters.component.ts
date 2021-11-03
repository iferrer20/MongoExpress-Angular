import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../core/services/category.service';
import { Category } from '../core/types/Category';

@Component({
  selector: 'shop-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnInit {

  constructor(public catService: CategoryService) { }

  ngOnInit(): void {
  }

}
