/**
 * Track Event
 */
export interface TrackEvent {
    id: string;
    size: string;
    position: string;
    color?: string;
    info?: string | undefined;
    isStart?: boolean;
    isEnd?: boolean;
    zIndex: string;
};
