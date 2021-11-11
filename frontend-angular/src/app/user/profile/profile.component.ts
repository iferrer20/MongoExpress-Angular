import { CarouselItem } from './../../shared/carousel/carousel-item.component';
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
  favoriteProducts: CarouselItem[] = [];
  lastFollowers: CarouselItem[] = [];
  lastFollowing: CarouselItem[] = [];

  oldShouldReuseRoute!: typeof BaseRouteReuseStrategy.prototype.shouldReuseRoute;
  
  @ViewChild('pfpInput') profileInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService 
  ) { }

  follow() {
    const old = this.user.areYouFollowing;
    this.userService.follow(this.user.id).subscribe(() => {
      if (!this.userService.user) { return; }
      this.user.areYouFollowing = true;
      if (!old) {
        this.user.followers++;
        this.user.lastFollowers?.push({
          id: this.userService.user.id,
          username: this.userService.user.username
        });
        this.readUserData();
      }
    });
  }
  
  unfollow() {
    const old = this.user.areYouFollowing;
    this.userService.unfollow(this.user.id).subscribe(() => {
      if (!this.userService.user) { return; }
      const id = this.userService.user.id;

      this.user.areYouFollowing = false;
      if (old) {
        this.user.followers--;
        this.user.lastFollowers = this.user.lastFollowers?.filter(u => u.id !== id);
        this.readUserData();
      }
    });
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

  readUserData() {
    this.favoriteProducts = this.user?.favorites?.map(f => (<CarouselItem> {
      link: {url: ['/shop/view/' + f.slug]},
      title: f.name
    })) || [];

    this.lastFollowers = this.user?.lastFollowers?.map(f => (<CarouselItem> {
      link: {url: ['/user/profile/@' + f.username]},
      title: f.username,
      img: '/api/user/pfp/' + f.id
    })) || [];

    this.lastFollowing = this.user?.lastFollowing?.map(f => (<CarouselItem> {
      link: {url: ['/user/profile/@' + f.username]},
      title: f.username,
      img: '/api/user/pfp/' + f.id
    })) || [];
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.data.user;
    this.me = this.route.snapshot.paramMap.get('id') == 'me';
    this.readUserData();
    
    this.oldShouldReuseRoute = this.router.routeReuseStrategy.shouldReuseRoute;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnDestroy(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = this.oldShouldReuseRoute;
  }

}
