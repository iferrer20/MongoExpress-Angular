import { Component, Input, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/types/Product';

@Component({
  selector: 'app-product-fav',
  templateUrl: './product-fav.component.html',
  styleUrls: ['./product-fav.component.scss']
})
export class ProductFavComponent implements OnInit {

  @Input() product!: Product;
  @Output('onFavorite') _onFavorite!: Function;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  onFavorite() {
    this.productService.like(this.product).subscribe();
    console.log(this.product)
    if (this._onFavorite) {
      this._onFavorite();
    }
  }

}
