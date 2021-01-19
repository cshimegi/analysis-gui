import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })

export class DateService {

    constructor() {}

    countAmountPerDay(data: any): Array<any>
    {
        let recordObj = data.reduce(function (result, datum) {
            const day = moment(datum.datetime).format("YYYY-MM-DD");
            if (!result[day]) result[day] = 0;
            result[day]++;
            return result;
        }, {});

        let recordArr = [];

        for (const [datetime, amount] of Object.entries(recordObj)) {
            recordArr.push({'datetime': datetime, 'amount': amount});
        }

        return recordArr;
    }
}