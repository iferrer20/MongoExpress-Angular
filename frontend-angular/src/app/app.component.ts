import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Truequepop';

  constructor(
    private router: Router,
    private title: Title
  ) {}
  
  ngOnInit() {
    this.setupTitleListener();
  }

  private setupTitleListener() {
    this.router.events
    .pipe(filter(e => e instanceof ResolveEnd))
    .subscribe((e) => {
      const ev = e as ResolveEnd;
      const { data } = getDeepestChildSnapshot(ev.state.root);
      if (data?.title) {
        this.title.setTitle(data.title + ' - ' + this.name);
      }
    });
  }
}

function getDeepestChildSnapshot(snapshot: ActivatedRouteSnapshot) {
  let deepestChild = snapshot.firstChild;
  while (deepestChild?.firstChild) {
    deepestChild = deepestChild.firstChild;
  }

  return deepestChild || snapshot;
}