import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DateService, CalenderService } from '@app/_services_';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import ja from '@fullcalendar/core/locales/ja';
import zhTw from '@fullcalendar/core/locales/zh-tw';
import { CalendarRepositoryService } from '@app/_repos_';
import { Calendar, CalendarList, CalendarEvent, RemindMinutes, Triage } from '@app/_models_';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CalendarComponent } from '@app/dialogs';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})

export class ScheduleComponent implements OnInit, AfterViewInit {
    @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
    @ViewChild('external') external: ElementRef;

    private readonly externalCssPath: string = "/assets/css/schedule";
    isRemoveChecked: boolean = false;
    options: any;
    events: Array<CalendarEvent>;
    private registedEvents: Array<any>;

    constructor (
        private dateService: DateService,
        private calendarRepoService: CalendarRepositoryService,
        private CalendarService: CalenderService,
        private matDialog: MatDialog
    )
    { }

    ngOnInit ()
    {
        this.events = this.getDefaultEvents();
        this.registedEvents = this.getRegistedEvents();
        this.options = {
            // themeSystem: 'bootstrap',
            customButtons: {
                new: {
                    text: 'New',
                    click: this.newEventDialog.bind(this)
                }
            },
            headerToolbar: {
                left: 'prev,next today new',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true,
            droppable: true, // allow things to be dropped onto the calendar
            aspectRatio: 2.3,
            handleWindowResize: true, // make calendar be responsive
            initialView: 'dayGridMonth',
            dateClick: this.handleDateClick.bind(this), // bind to ScheduleComponent's scope
            eventResize: this.handleEventResize.bind(this),
            eventClick: this.handleEventClick.bind(this),
            eventDrop: this.handleEventDrop.bind(this),
            eventReceive: this.handleEventReceive.bind(this),
            events: this.registedEvents,
            locales: [ ja, zhTw ],
            locale: "en", //ja, zh-tw
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin]
        };
    }

    ngAfterViewInit ()
    {
        this.initDraggableMenus();
        this.loadCustomStyles();
    }

    private initDraggableMenus (): void
    {
        new Draggable(this.external.nativeElement, {
            itemSelector: '.fc-event',
            eventData: function(eventEl) {
              return {
                title: eventEl.innerText
              }
            }
        });
    }

    /**
     * Load customized styles after view is completely loaded
     */
    private loadCustomStyles (): void
    {
        let css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = `${this.externalCssPath}/schedule.external.css`;

        document.getElementById("calendar-container")
            .appendChild(css);
    }

    /**
     * Get default events for draggable menus
     * 
     * @return draggableMenus
     */
    getDefaultEvents (): Array<CalendarEvent>
    {
        return this.CalendarService.getDefaultEvents();
    }

    /**
     * Get all registed events of current user
     * 
     * @return registedEvents
     */
    getRegistedEvents (): Array<any>
    {
        // ToDo: custom fields should be storaged extendedProps of event

        return [
            { id: 1, groupId: 1, title: 'event 1', start: '2021-02-24', end: '2021-02-26', backgroundColor: Triage[1],extendedProps: {detail: 'test'} },
            { id: 2, groupId: 2, title: 'event 2', start: '2021-02-27', end: '2021-02-27', extendedProps: {detail: 'test2'} }
        ];
    }

    private newEventDialog ()
    {
        let dialogConfig = new MatDialogConfig();
        dialogConfig.width = '350px';
        dialogConfig.data = {
            title: "New Event",
            message: "Go ahead to create a new event",
            button: {
                onSubmitText: "Send",
                onCloseText: "Close"
            }
        };
        // dialogConfig.direction = 'rtl';
        this.matDialog.open(CalendarComponent, dialogConfig);
    }

    /**
     * Handle date click event
     * 
     * @param arg
     */
    handleDateClick (arg): void
    {
        // ToDo: show all events of that date
        console.log('date click! ' + arg.dateStr);
    }

    /**
     * Handle event resize event
     * 
     * @param eventInfo
     */
    handleEventResize (eventInfo): void
    {
        console.log('EventResize', eventInfo)
        let startDate = eventInfo.event.start;
        let endDate = eventInfo.event.end;

        if (startDate) {
            startDate = this.dateService.getUnixDatetime(startDate);
        }

        if (endDate) {
            endDate = this.dateService.getUnixDatetime(endDate);
        }

        const CALENDAR = this.getCalendarParams({
            groupId: eventInfo.event.groupId,
            fromTime: startDate,
            toTime: endDate
        });
    }

    /**
     * Handle event click event
     * 
     * @param eventInfo
     */
    handleEventClick (eventInfo): void
    {
        console.log('EventClick', eventInfo)
    }

    /**
     * Handle event drop event
     * 
     * @param eventInfo
     */
    handleEventDrop (eventInfo): void
    {
        let startDate = eventInfo.event.start;
        let endDate = eventInfo.event.end;

        if (startDate) {
            startDate = this.dateService.getUnixDatetime(startDate);
        }

        if (endDate) {
            endDate = this.dateService.getUnixDatetime(endDate);
        }

        const CALENDAR = this.getCalendarParams({
            groupId: eventInfo.event.groupId,
            fromTime: startDate,
            toTime: endDate
        });
    }

    /**
     * Handle event receive event
     * 
     * @param eventInfo
     */
    handleEventReceive (eventInfo): void
    {
        const draggedEl = eventInfo.draggedEl;
        const groupId = draggedEl.id;
        let startDate = eventInfo.event.start;
        let endDate = eventInfo.event.end;
        
        if (startDate) {
            startDate = this.dateService.getUnixDatetime(startDate);
        }

        if (endDate) {
            endDate = this.dateService.getUnixDatetime(endDate);
        }

        const CALENDAR = this.getCalendarParams({
            groupId: groupId,
            fromTime: startDate,
            toTime: endDate
        });
        
        this.removeEventAfterDrop(eventInfo);
    }

    /**
     * Remove dragged event from menu after dropped
     * 
     * @param eventInfo
     */
    private removeEventAfterDrop (eventInfo): void
    {
        // is the "remove after drop" checkbox checked?
        // if (checkbox.checked) {
        //   // if so, remove the element from the "Draggable Events" list
        //   eventInfo.draggedEl.parentNode.removeChild(eventInfo.draggedEl);
        // }
    }

    private getCalendarParams (data: any): Calendar
    {
        const params: Calendar = {
            groupId: data.groupId,
            detail: data.detail ?? "",
            triage: data.triage ?? Triage.BLACK,
            do_remind: data.doRemind ?? false,
            remind_minutes: data.remindMinutes ?? RemindMinutes.NO_REMIND,
            from_time: data.fromTime ?? 0,
            to_time: data.toTime ?? 0
        };

        return params;
    }
}