/**
 * Track Event
 */
export interface ITrackEvent {
    id: string;
    size: string;
    color?: string;
    info?: string | undefined;
    isStart?: boolean;
    isEnd?: boolean;
};
