import { ProductService } from './../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductFilters } from '../core/types/Product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  
  constructor(
    public route: ActivatedRoute,
    public prodService: ProductService,
    private router: Router
  ) { }

  onFilter(filters: ProductFilters) {
    this.prodService.list(filters).subscribe();
  }

  ngOnInit(): void {
  }

}
