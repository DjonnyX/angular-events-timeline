import { EventTypes } from "../enums";

/**
 * Event
 */
export interface EventCompiled {
    /**
     * Date start
     */
    dateStart: number;
    /**
     * Date end
     */
    dateEnd: number;
    /**
     * Event type
     */
    type: EventTypes;
};