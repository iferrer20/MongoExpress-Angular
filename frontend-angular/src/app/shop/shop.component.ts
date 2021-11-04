import { ProductService } from './../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductFilters } from '../core/types/Product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, public prodService: ProductService) { }

  onFilter(filters: ProductFilters) {
    this.prodService.list(filters).subscribe();
  }

  ngOnInit(): void {
  }

}
