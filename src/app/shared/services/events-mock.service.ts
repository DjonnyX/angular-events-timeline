import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { getMockEventsData } from './mock/get-events';
import { from } from 'rxjs';
import { Data } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EventsMockService extends EventsService {
  constructor() {
    super();
  }

  override getEvents() {
    return from(new Promise<Data>((res) => {
      const t = 600 + Math.round(Math.random() * 400);
      setTimeout(() => {
        res(getMockEventsData());
      }, t);
    }));
  }
}
