import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Observable, pipe, Subject, Subscription } from 'rxjs';

export interface EventData {
    name: string,
    data: any
}

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject = new Subject();

  emit(eventName: string, data: any) : void {
    let eventData = {name: eventName, data: data};
    this.subject.next(eventData);
  }

  on(eventName: string) : Observable<any> {
    return this.subject.pipe(
      filter<any>((e: EventData) => e.name === eventName),
      map((e: EventData) => e.data)
    );

  }

  constructor() { }
}