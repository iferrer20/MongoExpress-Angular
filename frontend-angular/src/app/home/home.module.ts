import { NgModule } from '@angular/core';
import { CategoryResolver } from '../core/resolvers/category.resolver';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  providers: [
    CategoryResolver
  ]
})
export class HomeModule { }

