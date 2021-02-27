export interface CalendarEvent {
    id   : number;
    label: string;
}

export enum Triage {
    BLACK  = 4,
    GREEN  = 3,
    ORANGE = 2,
    RED    = 1
}

export namespace Triage {
    export function isValid (value: Triage): boolean
    {
        return value === Triage.BLACK ||
            value === Triage.GREEN ||
            value === Triage.ORANGE ||
            value === Triage.RED;
    }
}

export interface CalendarTriage {
    id   : Triage;
    label: string;
}

export enum RemindMinutes {
    NO_REMIND      = 0,
    TEN_MINS       = 10,
    ONE_QUARTER    = 15,
    HALF_HOUR      = 30,
    THREE_QUARTERS = 45,
    ONE_HOUR       = 60
}

export namespace RemindMinutes {
    export function isValid (value: RemindMinutes): boolean
    {
        return value === RemindMinutes.NO_REMIND ||
            value === RemindMinutes.TEN_MINS ||
            value === RemindMinutes.ONE_QUARTER ||
            value === RemindMinutes.HALF_HOUR ||
            value === RemindMinutes.THREE_QUARTERS ||
            value === RemindMinutes.ONE_HOUR;
    }
}

export interface CalendarRemindMinutes {
    id   : RemindMinutes;
    label: string;
}

export interface Calendar {
    groupId       : number;
    detail        : string | null;
    triage        : Triage;
    do_remind     : boolean;
    remind_minutes: RemindMinutes;
    from_time     : number;
    to_time       : number;
}

export interface CalendarListUser {
    id      : bigint;
    username: string;
    email   : string;
}

export interface CalendarList {
    id            : number;
    user          : CalendarListUser;
    groupId       : number;
    detail        : string | null;
    triage        : Triage;
    do_remind     : boolean;
    remind_minutes: RemindMinutes;
    from_time     : number;
    to_time       : number;
}