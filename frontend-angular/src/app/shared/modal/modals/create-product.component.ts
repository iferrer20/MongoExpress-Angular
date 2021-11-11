import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category.service';
import { EventBusService } from 'src/app/core/services/event-bus.service';
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

  productForm!: FormGroup;
  
  constructor(
    public catService: CategoryService, 
    public prodService: ProductService,
    private fb: FormBuilder,
    private bus: EventBusService
    ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quality: ['', [Validators.required]],
      state: ['', [Validators.required]],
      image: [null, [Validators.required]]
    });
  }

  onSelect(event: any) {
    const file = event.target.files[0];
    this.productForm.patchValue({image: file});
    this.productForm.get('image')?.updateValueAndValidity();
  }

  submit() {
    if (this.productForm.invalid)
      return;
    
    this.bus.emit('modal', {
      modal: '',
      opened: false
    });

    this.prodService.post(this.productForm.value).subscribe(
      () => {
        this.bus.emit('reload-products', {});
      }
    );
  }

}
