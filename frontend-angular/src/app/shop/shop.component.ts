import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Product from '../core/types/Product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  productList!: Product[];
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productList = this.route.snapshot.data.productList;
  }

}
