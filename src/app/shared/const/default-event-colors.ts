import { EventTypes } from "../enums";

export const DEFAULT_COLORS = {
    [EventTypes.NORMAL]: 'green',
    [EventTypes.DANGEROUS]: 'orange',
    [EventTypes.CRITICAL]: 'red',
};