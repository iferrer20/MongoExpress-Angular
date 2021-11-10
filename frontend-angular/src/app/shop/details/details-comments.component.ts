import { ProductService } from 'src/app/core/services/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/core/types/Product';
import { UserComment } from 'src/app/core/types/User';

@Component({
  selector: 'shop-comments',
  templateUrl: './details-comments.component.html',
  styleUrls: ['./details-comments.component.scss']
})
export class DetailsCommentsComponent implements OnInit {

  @Input() product!: Product;

  commentForm!: FormGroup;

  constructor(
    private prodService: ProductService, 
    private fb: FormBuilder
  ) { }

  postComment() {

    if (this.commentForm.invalid)
      return;

    this.prodService.comment(this.product, this.commentForm.value).subscribe((c: UserComment) => {
      console.log(c)
      this.product.comments.push(c);
    });
  }

  removeComment(comment: UserComment) {
    this.prodService.removeComment(this.product, comment).subscribe(() => {
      this.product.comments = this.product.comments.filter(c => c.id != comment.id); // Remove comment from list
    });
  }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

}
