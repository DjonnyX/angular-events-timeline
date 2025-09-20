import { Data } from "../models";
import { EventTypes } from "../enums";

const EVENT_TYPES = {
    [EventTypes.NORMAL]: true,
    [EventTypes.DANGEROUS]: true,
    [EventTypes.CRITICAL]: true,
};

const isValidDate = (date: string) => {
    return !Number.isNaN(Date.parse(date));
}

export const isValidEventsData = (data: Data | undefined) => {
    if (!data) {
        return true;
    }

    if (data && Array.isArray(data.events) && data.intervalDates
        && isValidDate(data.intervalDates.dateStart) && isValidDate(data.intervalDates.dateEnd)) {
        for (let i = 0, l = data.events.length; i < l; i++) {
            const { dateStart, dateEnd, type } = data.events[i];
            if (!isValidDate(dateStart) || !isValidDate(dateEnd) || !EVENT_TYPES[type]) {
                return false;
            }
        }
    } else {
        return false;
    }

    return true;
}