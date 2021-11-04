import { ProductService } from './../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductFilters } from '../core/types/Product';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  
  initialFilters: ProductFilters = {};

  constructor(
    public route: ActivatedRoute,
    public prodService: ProductService,
    private router: Router
  ) { }

  onFilter(filters: ProductFilters) {
    this.prodService.list(filters).subscribe();

    this.router.navigate(
    [],
    {
      relativeTo: this.route,
      queryParams: filters
    });
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(tap(
      ({text, category, author, order, quality}) => {
        this.initialFilters = {
          text, category, author, order, quality
        };
        console.log('filters', this.initialFilters)
      }
    )).subscribe()
    
  }

}
