import { Product } from './../../core/types/Product';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-rate',
  templateUrl: './product-rate.component.html',
  styleUrls: ['./product-rate.component.scss']
})
export class ProductRateComponent implements OnInit {

  @Input() product!: Product;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  onRate(value: number) {
    console.log(value);
    if (value === this.product.userRating) {
      value = 0; /** delete rating */
    }

    this.productService.rate(this.product, value).subscribe();
  }

}
