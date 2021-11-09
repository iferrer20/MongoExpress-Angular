import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product, qualities, states } from 'src/app/core/types/Product';

@Component({
  selector: 'modal-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  qualities = qualities;
  states = states;

  product: Product = <Product> {};
  productForm!: FormGroup;
  
  constructor(
    public catService: CategoryService, 
    public prodService: ProductService,
    private fb: FormBuilder 
    ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quality: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
  }

  submit() {
    console.log(this.product)
    if (this.productForm.invalid)
      return;
    
    this.prodService.post(this.product).subscribe();
  }

}