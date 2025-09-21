import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, input, signal, Signal, viewChild, ViewEncapsulation } from '@angular/core';
import { TooltipDirective } from '../../directives';
import { isValidEventsData } from '../../utils';
import { getEventInfo } from '../../utils/getEventInfo';
import { Data, EventColors } from '../../models';
import { TrackData } from '../../models/track-data.type';
import { EventParsed } from '../../models/event-parsed.interface';
import { TrackEvent } from '../../models/track-event.interface';
import { DEFAULT_COLORS } from '../../const/default-event-colors';

const sort = (a: EventParsed, b: EventParsed): number => {
  if ((a.dateStart < b.dateStart && a.dateEnd < b.dateEnd) ||
    (a.dateStart > b.dateEnd && a.dateEnd > b.dateEnd)
  ) {
    return 1;
  }

  if (a.dateStart < b.dateStart && a.dateEnd < b.dateStart) {
    return -1;
  }
  return 0;
};

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

  private _bounds = signal<{ width: number, height: number } | null>(null);

  private _onResizeHandler = () => {
    const bounds = this._track()?.nativeElement?.getBoundingClientRect();
    if (bounds) {
      this._bounds.set({ width: bounds.width, height: bounds.height });
    }
  };

  private _resizeObserver = new ResizeObserver(this._onResizeHandler);

  private _track = viewChild<ElementRef<HTMLUListElement>>('track');

  constructor() {
    effect(() => {
      const track = this._track();
      if (track && track.nativeElement) {
        this._resizeObserver.observe(track.nativeElement);
      }
    });

    this.events = computed(() => {
      const data = this.data(), bounds = this._bounds();
      if (bounds && data && isValidEventsData(data)) {
        const result: TrackData = [], colors = this.colors(), tStart = Date.parse(data.intervalDates.dateStart),
          tEnd = Date.parse(data.intervalDates.dateEnd), total = tEnd - tStart, sorted = data.events.map(v => ({
            type: v.type, dateStart: Date.parse(v.dateStart),
            dateEnd: Date.parse(v.dateEnd)
          })).sort(sort);

        let min: TrackEvent | undefined = undefined, max: TrackEvent | undefined = undefined, start = tStart;

        for (let i = 0, len = sorted.length; i < len; i++) {
          const e = sorted[i],
            eStart = e.dateStart, eEnd = e.dateEnd,
            color = colors[e.type], info = getEventInfo(e);

          const l = eEnd - eStart,
            x = bounds.width - (bounds.width - (((eStart - tStart) / total) * bounds.width)),
            w = (l / total) * bounds.width,
            size = `${w}px`,
            item: TrackEvent = {
              id: `${i}`,
              color,
              size,
              w,
              x,
              position: `translate3d(${x}px, 0, 0)`,
              info,
              isStart: false,
              isEnd: false,
              zIndex: '1',
            };

          result.push(item);
          start += l;

          if (min) {
            if (x < min.x) {
              min = item;
            }
          } else {
            min = item;
          }

          if (max) {
            if ((x + w) > (max.x + max.w)) {
              max = item;
            }
          } else {
            max = item;
          }
        }

        if (min) {
          min.isStart = true;
        }
        if (max) {
          max.isEnd = true;
        }

        return result;
      }
      return [];
    });
  }
}
