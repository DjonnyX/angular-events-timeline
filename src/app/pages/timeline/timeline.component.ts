import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { EventsMockService } from '../../shared/services/events-mock.service';
import { EventsImplementationService } from '../../shared/services/events-implementation.service';
import { EventsService } from '../../shared/services/events.service';
import { EventsTimelineComponent } from '../../shared/components';
import { Data } from '../../shared/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-timeline',
  imports: [EventsTimelineComponent, RouterModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  providers: [
    {
      provide: EventsService, useClass: environment.useMock ? EventsMockService : EventsImplementationService,
    }
  ]
})
export class TimelineComponent {
  readonly homePagePath = '../home';

  eventCollection = signal<Data | null | undefined>(undefined);

  private _service = inject(EventsService);

  constructor() {
    const $events = this._service.getEvents();

    $events.pipe(
      takeUntilDestroyed(),
      tap(v => {
        this.eventCollection.set(v);
      }),
      catchError(err => {
        // etc
        return of();
      }),
    ).subscribe();
  }
}
