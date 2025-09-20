import { CommonModule } from '@angular/common';
import { Component, computed, input, Signal, ViewEncapsulation } from '@angular/core';
import { Data, EventColors, Event } from '../../models';
import { TrackData } from '../../models/track-data.type';
import { isValidEventsData } from '../../utils';
import { DEFAULT_COLORS } from '../../const/default-event-colors';
import { TooltipDirective } from '../../directives';
import { getEventInfo } from '../../utils/getEventInfo';

const sort = (a: Event, b: Event): number => {
  if (a.dateStart > b.dateEnd) {
    return 1;
  }
  if (a.dateEnd < b.dateStart) {
    return -1;
  }
  return 0;
},
  NONE = 'none';

@Component({
  selector: 'events-timeline',
  imports: [CommonModule, TooltipDirective],
  templateUrl: './events-timeline.component.html',
  styleUrl: './events-timeline.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class EventsTimelineComponent {
  data = input<Data | null | undefined>();

  colors = input<EventColors>(DEFAULT_COLORS);

  events: Signal<TrackData>;

  constructor() {
    this.events = computed(() => {
      const data = this.data();
      if (data && isValidEventsData(data)) {
        const result: TrackData = [], colors = this.colors(), tStart = Date.parse(data.intervalDates.dateStart),
          tEnd = Date.parse(data.intervalDates.dateEnd), total = tEnd - tStart, sorted = data.events.sort(sort);

        let start = tStart, id = 0;

        for (let i = 0, len = sorted.length; i < len; i++) {
          const isStart = i === 0, isEnd = i === len - 1, e = sorted[i],
            eStart = Date.parse(e.dateStart), eEnd = Date.parse(e.dateEnd),
            color = colors[e.type], info = getEventInfo(e);

          if (start < eStart) {
            const l = eStart - start, size = `${(l * 100) / total}`;
            start += l;
            id++;
            result.push({
              id: `${id}`,
              color: NONE,
              size,
            });
          }
          const l = eEnd - eStart, size = `${(l * 100) / total}`;
          start += l;

          id++;
          result.push({
            id: `${id}`,
            color,
            size,
            info,
            isStart,
            isEnd,
          });

          if (isEnd) {
            if (start > 0) {
              const l = tEnd - start, size = `${(l * 100) / total}`;
              start += l;
              id++;
              result.push({
                id: `${id}`,
                size,
              });
            }
          }
        }

        return result;
      }
      return [];
    });
  }
}
