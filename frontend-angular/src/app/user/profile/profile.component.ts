import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService 
  ) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data.user;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    
  }

}
