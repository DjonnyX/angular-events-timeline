/**
 * Track Event
 */
export interface TrackEvent {
    id: string;
    size: string;
    position: string;
    x: number;
    w: number;
    color?: string;
    info?: string | undefined;
    isStart?: boolean;
    isEnd?: boolean;
    zIndex: string;
};
