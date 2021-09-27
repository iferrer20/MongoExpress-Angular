import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [

  ],
  providers: [
    ApiService,
    ProductService,
    UserService
  ]
})
export class CoreModule { }
