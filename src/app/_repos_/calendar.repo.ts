import { Injectable } from '@angular/core';
import { BaseRepositoryService } from './base.repo';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })

export class CalendarRepositoryService extends BaseRepositoryService {
    private calendarRepo = 'calendar';

    constructor(
        protected http: HttpClient
    ) {
        super(http);
    }

    /**
     * Get all calendars
     * 
     * @param repo
     * @param options
     * @returns Error|any
     */
    getAllCalendars()
    {
        return this.getAll(this.calendarRepo);
    }

    /**
     * Get calendar By conditions
     * 
     * @param params
     * @returns Error|any
     */
    getCalendarBy(params: any)
    {
        const options = {
            params: params
        };
        
        return this.getBy(this.calendarRepo, options);
    }

    /**
     * Create a new calendar
     * 
     * @param params
     * @returns Error|any
     */
    createCalendar (params: any)
    {
        const options = {
            params: params
        };

        return this.post(this.calendarRepo, options);
    }
}