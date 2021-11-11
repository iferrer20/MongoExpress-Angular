import { UserService } from 'src/app/core/services/user.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/types/Product';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {

  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public userService: UserService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
  }

  getCreationDateString() {
    return new Date(this.product.datePublished).toLocaleString();
  }
  
  goBack() {
    this.location.back();
  }

  deleteProduct() {
    this.productService.delete(this.product).subscribe(() => {
      this.goBack();
    });
  }
}
