import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, first, map, tap } from "rxjs/operators";
import { Observable } from 'rxjs';

interface BodyData {
  [key: string]: any,
  list?: any
  error?: any
}

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {}

  request<I>(method: string, uri: string, data: any = {}): Observable<I> {
    return this.http.request<I>(method, environment.api_url + uri, {
      body: data
    })
    .pipe(
      catchError((e: BodyData) => { 
        if (e.error?.error) {
          throw new Error(e.error?.error);
        } else {
          throw new Error('Unknown error');
        }
      })
    );
  }
  
}

