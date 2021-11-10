import { ProductService } from './../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFilters } from '../core/types/Product';
import { EventBusService } from '../core/services/event-bus.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  
  filters!: ProductFilters;
  constructor(
    public route: ActivatedRoute,
    public prodService: ProductService,
    private bus: EventBusService,
    private router: Router
  ) { }

  onFilter(filters: ProductFilters) {
    this.filters = filters;
    this.prodService.list(filters).subscribe();
  }

  ngOnInit(): void {
    this.bus.on('reload-products').subscribe(() => {
      console.log('a')
      this.prodService.list(this.filters).subscribe();
    });
  }

}
