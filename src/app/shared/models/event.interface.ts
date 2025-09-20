import { EventTypes } from "../enums";
import { IDateRange } from "./date-range.interface";

/**
 * Event
 */
export interface Event extends IDateRange {
    /**
     * Event type
     */
    type: EventTypes;
};