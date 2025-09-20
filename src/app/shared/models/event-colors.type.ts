import { EventTypes } from "../enums";

export type EventColors = {
    [EventTypes.NORMAL]: string;
    [EventTypes.DANGEROUS]: string;
    [EventTypes.CRITICAL]: string;
}