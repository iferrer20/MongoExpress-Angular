import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      text: ['', []]
    });
    
    this.route.queryParams.pipe(tap(
      (params: Params) => this.searchForm.setValue({text: params?.text || ''})
    )).subscribe();
  }

  doSearch() {
    const query = this.searchForm.get('text')?.value;
    this.router.navigate(['/shop'], {
      queryParams: {text: query || null},
      queryParamsHandling: 'merge'
    });
  }

}
