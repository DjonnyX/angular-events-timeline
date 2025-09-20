import { Observable } from "rxjs";
import { Data } from "../models";

export abstract class EventsService {
  constructor() {}

  abstract getEvents(): Observable<Data>;
}
