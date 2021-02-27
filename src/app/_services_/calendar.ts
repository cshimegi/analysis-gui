import { Injectable } from '@angular/core';
import { CalendarEvent, CalendarTriage, CalendarRemindMinutes } from '@app/_models_';


@Injectable({ providedIn: 'root' })

export class CalenderService {
    private readonly defaultEvents: Array<CalendarEvent> = [
        { id: 1, label: "Breakfast" },
        { id: 2, label: "Lunch" },
        { id: 3, label: "Dinner" },
        { id: 4, label: "Sports" },
        { id: 5, label: "Travel" },
        { id: 6, label: "Family" }
    ];
    private readonly triages: Array<CalendarTriage> = [
        { id: 1, label: "Red" },
        { id: 2, label: "Orange" },
        { id: 3, label: "Green" },
        { id: 4, label: "Black" }
    ];
    private readonly remindMinutes: Array<CalendarRemindMinutes> = [
        { id: 0, label: "No Remind" },
        { id: 10, label: "10 Minutes" },
        { id: 15, label: "15 Minutes" },
        { id: 30, label: "30 Minutes" },
        { id: 45, label: "45 Minutes" },
        { id: 60, label: "60 Minutes" }
    ];

    constructor(
    ) {}

    getDefaultEvents (): Array<CalendarEvent>
    {
        return this.defaultEvents;
    }

    getTriages (): Array<CalendarTriage>
    {
        return this.triages;
    }

    getRemindMinutes (): Array<CalendarRemindMinutes>
    {
        return this.remindMinutes;
    }

    private Handle403()
    {
        
    }
}