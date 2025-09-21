import { EventTypes } from "../../enums";
import { Data, Event } from "../../models";

export const MOCK_EVENTS_DATA: Data = {
    events: [
        {
            dateStart: '2022-01-01T01:00:00',
            dateEnd: '2022-01-01T12:00:00',
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

const TYPE_BY_INDEX = {
    0: EventTypes.NORMAL,
    1: EventTypes.DANGEROUS,
    2: EventTypes.CRITICAL,
};

export const getMockEventsData = (): Data => {
    const dateStart = new Date('2022-01-01T00:00:00'), dateEnd = new Date('2022-01-02T00:00:00'),
        dateStartNum = dateStart.getTime(), dateEndNum = dateEnd.getTime(), delta = dateEndNum - dateStartNum,
        result = {
            events: new Array<Event>(),
            intervalDates: {
                dateStart: dateStart.toString(),
                dateEnd: dateEnd.toString(),
            }
        };

    const eventLength = 3 + Math.round(Math.random() * 20);
    let time = delta, startNum = dateStartNum;

    for (let i = 0; i < eventLength; i++) {
        const sDelta = (Math.random() * time), start = startNum + sDelta;
        time -= sDelta;
        const eDelta = (Math.random() * time), end = start + eDelta;
        time -= eDelta;
        startNum += sDelta + eDelta;
        const num = Math.round(Math.random() * 2) as (0 | 1 | 2), event: Event = {
            type: TYPE_BY_INDEX[num],
            dateStart: new Date(start).toString(),
            dateEnd: new Date(end).toString(),
        };
        result.events.push(event);
    }

    return result;
}
