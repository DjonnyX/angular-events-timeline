import { inject, Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EventsImplementationService extends EventsService {
  private _http = inject(HttpClient);

  constructor() {
    super();
  }

  override getEvents() {
    return this._http.get<Data>('events');
  }
}