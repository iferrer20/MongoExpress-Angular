import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { first, map } from "rxjs/operators";
import { Observable } from 'rxjs';


@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {}

  request<I>(method: string, uri: string, data: any = {}): Observable<I> {
    return this.http.request<I>(method, environment.api_url + uri, {
      body: data
    })
    .pipe(
      first(),
      map(({data}: any) => data)
    );
  }
  
}

