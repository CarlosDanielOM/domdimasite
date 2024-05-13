export interface Eventsub {
    _id?: string;
    type?: string;
    version?: number
    condition?: {};
    enabled?: boolean;
    message?: string;
    endMessage?: string;
    endEnabled?: boolean;
    minViewers?: number;
}
