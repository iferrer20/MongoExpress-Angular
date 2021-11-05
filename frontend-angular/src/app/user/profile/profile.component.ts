import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  me!: boolean;
  
  @ViewChild('pfpInput') profileInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService 
  ) { }

  follow() {
    this.userService.follow(this.user._id).subscribe();
  }

  changeProfile() {
    const newpfp: File = this.profileInput.nativeElement.files[0];
    this.userService.changeProfile(newpfp).subscribe();
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.data.user;
    this.me = this.route.snapshot.paramMap.get('id') == 'me';
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    
  }

}
