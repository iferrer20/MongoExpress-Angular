import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../core/types/Product';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {

  product!: Product;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
  }

  getCreationDateString() {
    return new Date(this.product.datePublished).toLocaleString();
  }
  
  goBack() {
    history.back();
  }
}
