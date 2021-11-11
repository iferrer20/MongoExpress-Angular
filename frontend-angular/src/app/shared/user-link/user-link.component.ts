import { User } from 'src/app/core/types/User';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.scss']
})
export class UserLinkComponent implements OnInit {

  @Input() user!: User;
  @Input() link?: string;
  
  constructor() { }

  ngOnInit(): void {
  }

  getProfileLink() {
    return this.link || '/user/profile/@' + this.user.username;
  }

}
