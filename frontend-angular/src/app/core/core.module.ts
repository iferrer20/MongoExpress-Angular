import { ProductResolver } from './resolvers/product.resolver';
import { ProductListResolver } from './resolvers/product-list.resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { CategoryResolver } from './resolvers/category.resolver';
import { EventBusService } from './services/event-bus.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    CategoryResolver,
    ApiService,
    ProductService,
    CategoryService,
    UserService,
    AuthGuard,
    ProductListResolver,
    ProductResolver,
    EventBusService
  ]
})
export class CoreModule { }
