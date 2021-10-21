import { CategoryCarouselResolver } from './../shared/category-carousel/category-carousel-resolver.service';
import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  providers: [
    CategoryCarouselResolver
  ]
})
export class HomeModule { }

