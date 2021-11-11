import { UserService } from 'src/app/core/services/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserComment } from 'src/app/core/types/User';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() comments!: UserComment[];
  @Input() commentReplied!: UserComment;
  @Input() replyComment?: UserComment;
  @Output() onRemove: EventEmitter<UserComment> = new EventEmitter();
  @Output() onReply: EventEmitter<UserComment> = new EventEmitter();

  constructor(public uService: UserService) {
  }

  me(c: UserComment) {
    return c.user.id == this.uService.user?.id;
  }

  remove(c: UserComment) {
    
    if (!c.commentReplied && this.commentReplied) {
      c.commentReplied = this.commentReplied;
    }

    this.onRemove.emit(c);
  }
  reply(c: UserComment) {
    
    c.commentReplied = this.commentReplied;
    this.onReply.emit(c);
  }

  ngOnInit(): void {
    
  }

}
