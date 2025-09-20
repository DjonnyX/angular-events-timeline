/**
 * Track Event
 */
export interface ITrackEvent {
    id: string;
    size: string;
    position: string;
    color?: string;
    info?: string | undefined;
    isStart?: boolean;
    isEnd?: boolean;
    zIndex: string;
};
