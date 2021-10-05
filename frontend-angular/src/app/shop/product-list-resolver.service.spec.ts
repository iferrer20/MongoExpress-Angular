import { TestBed } from '@angular/core/testing';

import { ProductListResolver } from './product-list-resolver.service';

describe('ProductListResolver', () => {
  let service: ProductListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductListResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
