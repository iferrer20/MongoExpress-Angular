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
  
  filters: ProductFilters = <ProductFilters> {};
  f: boolean = true;

  constructor(
    public route: ActivatedRoute,
    public prodService: ProductService,
    private bus: EventBusService,
    private router: Router
  ) { }

  onFilter(filters: ProductFilters) {
    this.filters = filters;
    if (!this.f) {
      this.prodService.list(filters).subscribe();
    } else {
      this.f = false;
    }
    
  }
  setPagination(n: number) { 
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {page: n || null},
      queryParamsHandling: 'merge'
    });
    //this.prodService.list(this.filters).subscribe();
  }

  getNpages() {
    const total = this.prodService.productList.total;
    if (total % 6 == 0) {
      return total/6;
    } else {
      return ~~(total/6)+1;
    }
  }

  ngOnInit(): void {
    this.bus.on('reload-products').subscribe(() => {
      this.prodService.list(this.filters).subscribe();
    });
  }

}
