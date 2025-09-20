import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, input, signal, Signal, viewChild, ViewEncapsulation } from '@angular/core';
import { Data, EventColors, Event } from '../../models';
import { TrackData } from '../../models/track-data.type';
import { isValidEventsData } from '../../utils';
import { DEFAULT_COLORS } from '../../const/default-event-colors';
import { TooltipDirective } from '../../directives';
import { getEventInfo } from '../../utils/getEventInfo';
import { EventCompiled } from '../../models/event-compiled.interface';

const sort = (a: EventCompiled, b: EventCompiled): number => {
  if (a.dateEnd < b.dateStart) {
    return -1;
  }
  if (a.dateStart > b.dateEnd) {
    return 1;
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

        let start = tStart;

        for (let i = 0, len = sorted.length, endIndex = len - 1; i < len; i++) {
          const isStart = i === 0, isEnd = i === endIndex, e = sorted[i],
            eStart = e.dateStart, eEnd = e.dateEnd,
            color = colors[e.type], info = getEventInfo(e);

            let pos = 0;
          if (start < eStart) {
            pos = eStart - start;
            start += pos;
          }
          const l = eEnd - eStart, size = `${(l / total) * bounds.width}px`;

          result.push({
            id: `${i}`,
            color,
            size,
            position: `translate3d(${bounds.width - (((tEnd - start) / total) * bounds.width)}px, 0, 0)`,
            info,
            isStart,
            isEnd,
            zIndex: '1',
          });
          start += l;

          if (isEnd) {
            if (start > 0) {
              const l2 = tEnd - start;
              start += l2;
            }
          }
        }

        return result;
      }
      return [];
    });
  }
}
