import { EventTypes } from "../enums";
import { EventParsed } from "../models/event-parsed.interface";

const NAME_BY_EVENT = {
    [EventTypes.NORMAL]: 'Normal',
    [EventTypes.DANGEROUS]: 'Dangerous',
    [EventTypes.CRITICAL]: 'Critical',
}

export const getEventInfo = (event: EventParsed, locale = 'en-US'): string => {
    return `${NAME_BY_EVENT[event.type]} from ${new Intl.DateTimeFormat(locale, {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(event.dateStart))} to ${new Intl.DateTimeFormat(locale, {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(event.dateEnd))}`;
}