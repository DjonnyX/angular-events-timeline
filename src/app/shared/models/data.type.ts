import { Event } from './event.interface';
import { IntervalDates } from './interval-dates.interface';

/**
 * Events Data
 */
export type Data = {
    /**
     * Events
     */
    events: Event[];
    /**
     * Interval Dates
     */
    intervalDates: IntervalDates;
}
