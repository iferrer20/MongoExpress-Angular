import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, first, map } from "rxjs/operators";
import { Observable } from 'rxjs';

interface BodyData {
  data?: any,
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
      first(),
      map((bodyData: BodyData) => {
        return bodyData.data;
      }),
      catchError((e: BodyData) => { 
        const { error } = e.error;
        if (error) {
          throw new Error(error);
        } else {
          throw new Error('Unknown error');
        }
      })
    );
  }
  
}

