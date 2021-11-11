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
  replyComment?: UserComment;

  commentForm!: FormGroup;

  constructor(
    private prodService: ProductService, 
    private fb: FormBuilder
  ) { }

  postComment() {
    if (this.commentForm.invalid)
      return;

    this.prodService.comment(this.product, {...this.commentForm.value, commentReplied: this.replyComment?.id}).subscribe((c: UserComment) => {
      if (this.replyComment?.id) {
        this.replyComment.repliedComments.push(c);
        this.replyComment = undefined;
      } else {
        this.product.comments.push(c);
      }
    });
  }

  removeComment(comment: UserComment) {
    this.prodService.removeComment(this.product, comment).subscribe(() => {
      if (comment.commentReplied) {
        comment.commentReplied.repliedComments = comment.commentReplied.repliedComments.filter(c => c.id != comment.id);
      } else {
        this.product.comments = this.product.comments.filter(c => c.id != comment.id); // Remove comment from list
      }
      
    });
  }

  setReplyComment(comment: UserComment) {
    if (this.replyComment?.id != comment.id) { // Toggle
      this.replyComment = comment;
    } else {
      this.replyComment = undefined;

    }
    
  }


  ngOnInit(): void {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

}
