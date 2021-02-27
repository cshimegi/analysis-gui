import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })

export class DateService {

    constructor () {}

    countAmountPerDay (data: any): Array<any>
    {
        let recordObj = data.reduce((result, datum) => {
            const day = this.formatDatetime(datum.datetime, "YYYY-MM-DD");
            
            if (!result[day]) {
                result[day] = 0;
            }

            result[day]++;
            
            return result;
        }, {});

        let recordArr = [];

        for (const [datetime, amount] of Object.entries(recordObj)) {
            recordArr.push({
                'datetime': datetime,
                'amount': amount
            });
        }

        return recordArr;
    }

    getUnixDatetime (datetime: string): number
    {
        return moment(datetime).unix();
    }

    getNow (): moment.Moment
    {
        return moment();
    }

    getPastDatetime (daysAgo: number): Date
    {
        return this.getNow().add(-daysAgo, 'days').toDate();
    }

    getStringPastDatetime (daysAgo: number): string
    {
        return this.getPastDatetime(daysAgo).toISOString();
    }

    formatDatetime (
        datetime: string|number,
        format: string = "YYYY/MM/DD",
        deltaDays: number = 0): string
    {
        return moment(datetime).add(deltaDays, 'days').format(format);
    }

    getDuration (timeDiff: string): moment.Duration
    {
        return moment.duration(timeDiff);
    }

}