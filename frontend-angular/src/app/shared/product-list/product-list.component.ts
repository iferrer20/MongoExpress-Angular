import { Component, Input, OnInit } from '@angular/core';
import {User} from 'src/app/core/types/User';
import { Product, ProductList } from '../../core/types/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  page: number = 1;
  @Input() productList!: ProductList;

  constructor() {  }

  ngOnInit(): void {
  }

}
