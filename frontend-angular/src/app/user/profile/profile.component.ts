import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, BaseRouteReuseStrategy, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user!: User;
  me!: boolean;
  ver: number = 0;

  oldShouldReuseRoute!: typeof BaseRouteReuseStrategy.prototype.shouldReuseRoute;
  
  @ViewChild('pfpInput') profileInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService 
  ) { }

  follow() {
    this.userService.follow(this.user._id).subscribe();
  }

  signOut() {
    this.userService.signOut().subscribe(
      () => this.router.navigate(['/'])
    );
  }

  changeProfile() {
    const newpfp: File = this.profileInput.nativeElement.files[0];
    this.userService.changeProfile(newpfp).subscribe(() => {
      ++this.ver;
    });
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.data.user;
    this.me = this.route.snapshot.paramMap.get('id') == 'me';
    
    this.oldShouldReuseRoute = this.router.routeReuseStrategy.shouldReuseRoute;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnDestroy(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = this.oldShouldReuseRoute;
  }

}
