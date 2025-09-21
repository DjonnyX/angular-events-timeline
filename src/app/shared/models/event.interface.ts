import { EventTypes } from "../enums";
import { DateRange } from "./date-range.interface";

/**
 * Event
 */
export interface Event extends DateRange {
    /**
     * Event type
     */
    type: EventTypes;
};