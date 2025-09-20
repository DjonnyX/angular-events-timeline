import { EventTypes } from "../../enums";

export const MOCK_EVENTS_DATA = {
    events: [
        {
            dateStart: '2022-01-01T01:00:00',
            dateEnd: '2022-01-01T02:00:00',
            type: EventTypes.CRITICAL,
        },
        {
            dateStart: '2022-01-01T08:21:00',
            dateEnd: '2022-01-01T14:44:11',
            type: EventTypes.DANGEROUS,
        },
        {
            dateStart: '2022-01-01T22:11:00',
            dateEnd: '2022-01-01T23:50:00',
            type: EventTypes.NORMAL,
        },
    ],
    intervalDates: {
        dateStart: '2022-01-01T00:00:00',
        dateEnd: '2022-01-02T00:00:00',
    },
};
