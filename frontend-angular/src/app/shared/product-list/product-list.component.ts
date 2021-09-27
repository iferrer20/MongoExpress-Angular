import { Component, Input, OnInit } from '@angular/core';
import Product from '../../core/types/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [
    {
      _id: 'id',
      category: {
        _id: 'id',
        description: 'a',
        iconName: 'a',
        shortName: 'a'
      },
      datePublished: new Date(),
      description: 'description',
      likes: 0,
      name: 'name',
      owner: '',
      quality: 'a',
      price: 0,
      views: 0
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
