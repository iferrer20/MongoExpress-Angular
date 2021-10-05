import { Component, Input, OnInit } from '@angular/core';
import {User} from 'src/app/core/types/User';
import Product from '../../core/types/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products!: Product[];
  loading: boolean = false;

  constructor() {  }

  ngOnInit(): void {
  }

}
