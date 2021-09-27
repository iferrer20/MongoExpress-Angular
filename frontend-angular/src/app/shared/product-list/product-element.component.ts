import { Component, Input, OnInit } from '@angular/core';
import Product from '../../core/types/Product';

@Component({
  selector: 'app-product-element',
  templateUrl: './product-element.component.html',
  styleUrls: ['./product-element.component.scss']
})
export class ProductElementComponent implements OnInit {

  @Input() product!: Product;
  
  constructor() { }

  ngOnInit(): void {
  }

}
