import { CommonModule } from '@angular/common';
import { Component, computed, input, Signal, ViewEncapsulation } from '@angular/core';
import { Data, EventColors, Event } from '../../models';
import { TrackData } from '../../models/track-data.type';
import { isValidEventsData } from '../../utils';
import { DEFAULT_COLORS } from '../../const/default-event-colors';
import { TooltipDirective } from '../../directives';
import { getEventInfo } from '../../utils/getEventInfo';

const sort = (a: Event, b: Event): number => {
  if (a.dateStart > b.dateStart) {
    return 1;
  }
  if (a.dateStart < b.dateStart) {
    return -1;
  }
  return 0;
},
  generateId = (type: number | string, start: number | string, end: number | string): string => {
    return `${type}-${start}-${end}`;
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

        let start = tStart;

        for (let i = 0, l = sorted.length, iEnd = l - 1; i < l; i++) {
          const e = sorted[i], eStart = Date.parse(e.dateStart), eEnd = Date.parse(e.dateEnd), id = generateId(e.type, eStart, eEnd),
            color = colors[e.type], info = getEventInfo(e);

          if (start < eStart) {
            const l = eStart - start, size = `${(l * 100) / total}`, nId = generateId(NONE, start, eStart);
            start += l;
            result.push({
              id: nId,
              color: NONE,
              size,
              info: undefined,
            });
          }
          const isEnd = i === iEnd, l = eEnd - eStart, size = `${(l * 100) / total}`;
          start += l;

          result.push({
            id,
            color,
            size,
            info,
            isStart: i === 0,
            isEnd,
          });

          if (isEnd) {
            if (start > 0) {
              const l = tEnd - start, size = `${(l * 100) / total}`, nId = generateId(NONE, eEnd, tEnd);
              start += l;
              result.push({
                id: nId,
                color: NONE,
                size,
                info: undefined,
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
